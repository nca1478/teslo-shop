import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/config/auth/auth.config";

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();

  // que es esto: investigar!!!!!
  if (!session?.user) {
    return (
      <h3 className="text-5xl-500">Error 500 - No hay sesión de usuario</h3>
    );
  }

  const userAddress = (await getUserAddress(session?.user.id)) ?? undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, userId, ...filteredUserAddress } = userAddress || {}; // Excluir id y userId

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección de Entrega" />

        <AddressForm
          countries={countries}
          userStoredAddress={filteredUserAddress}
        />
      </div>
    </div>
  );
}
