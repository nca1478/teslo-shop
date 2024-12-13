"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
        locale: "es_VE", // 'en_US': usa, 'es_ES': españa
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};
