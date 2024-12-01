export interface Product {
  id?: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  // gender: Category;
  gender: Gender;
  images: string[];
  // todo: type: Type;
}
// export type Category = "men" | "women" | "kids" | "unisex";
export type Gender = "men" | "women" | "kids" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
