import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
// import { initialData } from "@/seed/seed";
// import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ gender: Gender; page?: string }>;
}

// const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { gender, page } = await params;
  const pageParam = page ? parseInt(page) : 1;

  // const products = seedProducts.filter((product) => gender === product.gender);

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page: pageParam,
      gender,
    });

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
