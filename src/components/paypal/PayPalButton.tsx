"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { Spinner } from "../ui/spinner/Spinner";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer(); // controlar carga del botón
  const rountedAmount = Math.round(amount * 100) / 100; // redondeo xxxx.xx

  if (isPending) {
    return <Spinner />;
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    // obtener el transactionId desde PAYPAL
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: { currency_code: "USD", value: `${rountedAmount}` },
        },
      ],
    });

    // actualizar el transactionId en la orden
    const order = await setTransactionId(orderId, transactionId);

    if (!order) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    // obtener el pago de la orden desde PAYPAL
    const details = await actions.order?.capture();

    if (!details) return;

    // verificar pago de la orden (con el transactionId)
    await paypalCheckPayment(details.id as string);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
