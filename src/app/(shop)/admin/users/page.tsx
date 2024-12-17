export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  const {
    users = [],
    totalPages = 1,
    ok,
  } = await getPaginatedUsers({
    page: pageParam,
  });

  if (users.length === 0 || !ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>

      {/* Paginación */}
      {users.length > 0 && <Pagination totalPages={totalPages} />}
    </>
  );
}
