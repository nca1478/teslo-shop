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

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

// export type Category = "men" | "women" | "kids" | "unisex";
export type Gender = "men" | "women" | "kids" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
