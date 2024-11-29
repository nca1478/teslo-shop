import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // ========================== Borrar registros previos ===========================
  // await Promise.all([

  // Alternativa #1 - sin reset de id
  // await prisma.productImage.deleteMany();

  // Alternativa #2 - resetea también los id de ProductImage
  await prisma.$executeRaw`TRUNCATE TABLE ONLY public."ProductImage" RESTART IDENTITY CASCADE;`;
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  // ============================= Agregar categorias ==============================
  const { categories, products } = initialData;
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>

  products.forEach(async (product) => {
    // ============================== Agregar Productos ==============================
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // ============================== Agregar Imagenes =============================
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutado correctamente...!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
