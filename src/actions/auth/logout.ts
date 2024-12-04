"use server";

import { signOut } from "@/config/auth/auth.config";

export const logout = async () => {
  await signOut();
};
