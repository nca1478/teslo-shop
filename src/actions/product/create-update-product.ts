"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Gender, Product } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { Size } from "@/interfaces";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

// Validación de datos del formulario
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Cargar y guardar las imágenes
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);

        if (!images) {
          throw new Error("Error al subir las imágenes");
        }

        // guardar en la base de datos
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // revalidar los paths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Revisar los logs, no se pudo actualizar/crear",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((res) => res.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
