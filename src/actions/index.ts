// auth
export * from "./auth/login";
export * from "./auth/logout";
export * from "./auth/register";

// product
export * from "./product/create-update-product";
export * from "./product/get-product-by-slug";
export * from "./product/get-stock-by-slug";
export * from "./product/product-pagination";

// country
export * from "./country/get-countries";

// address
export * from "./address/get-user-address";
export * from "./address/delete-user-address";
export * from "./address/set-user-address";

// order
export * from "./order/place-order";
export * from "./order/get-order-by-id";
export * from "./order/get-orders-by-user";
export * from "./order/get-paginated-orders-by-user";

// payments
export * from "./payments/set-transaction-id";
export * from "./payments/paypal-check-payment";

// user
export * from "./user/get-users";
export * from "./user/get-paginated-users";
export * from "./user/change-user-role";

// admin
export * from "./order/admin/get-orders";
export * from "./order/admin/get-paginated-orders";

// categories
export * from "./category/get-categories";
