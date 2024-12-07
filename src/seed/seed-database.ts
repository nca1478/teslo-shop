import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  // ========================== Borrar registros previos ===========================
  // await Promise.all([

  // Alternativa #1 - sin reset de id
  // await prisma.productImage.deleteMany();

  // Alternativa #2 - resetea también los id de ProductImage
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.$executeRaw`TRUNCATE TABLE ONLY public."ProductImage" RESTART IDENTITY CASCADE;`;
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { categories, products, users } = initialData;

  // ============================== Agregar usuarios ===============================
  await prisma.user.createMany({ data: users });

  // ============================== Agregar Paises ===============================
  await prisma.country.createMany({ data: countries });

  // ============================= Agregar categorias ==============================
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>

  // ============================== Agregar Productos ============================
  products.forEach(async (product) => {
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
