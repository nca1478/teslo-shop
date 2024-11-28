import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
// import { notFound } from "next/navigation";

interface Props {
  params: { id: Category };
}

const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = seedProducts.filter((product) => id === product.gender);
  const labels: Record<Category, string> = {
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
      <Title title={`Artículos para ${labels[id]}`} className="mb-2" />

      <ProductGrid products={products} />
    </div>
  );
}
