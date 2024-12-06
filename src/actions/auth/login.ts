"use server";

import { signIn } from "@/config/auth/auth.config";
// import { sleep } from "@/utils";
// import { AuthError } from "next-auth";

interface AuthError {
  type: string;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2);

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    const authError = error as AuthError;
    if (authError.type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
    return "UnknownError";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
