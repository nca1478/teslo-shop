import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";
// import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ gender: Gender }>;
  searchParams: Promise<{ page?: string }>;
}

// const seedProducts = initialData.products;

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;

  // data fictisia (seed/seed-database)
  // const products = seedProducts.filter((product) => gender === product.gender);

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page: pageParam,
      gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<Gender, string> = {
    men: "Hombres",
    women: "Mujeres",
    kids: "Niños",
    unisex: "Todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title title={`Artículos para ${labels[gender]}`} className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
