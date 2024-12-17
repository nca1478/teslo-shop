import Link from "next/link";
import { Title } from "@/components";
// import { initialData } from "@/seed/seed";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
// import { redirect } from "next/navigation";

// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

export default function CartPage() {
  // redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl font-bold">Agregar más items</span>
            <Link href="/" className="underline my-5">
              Continúa comprando
            </Link>

            {/* Items */}
            {/* <ProductsInCart productsInCart={productsInCart} /> */}
            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
