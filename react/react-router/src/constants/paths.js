const PATHS = {
  ROOT: {
    INDEX: "/",
    DUMMY: "/dummy",
    CARTS: "/dummy/carts",
    POSTS: "/dummy/posts",
    PRODUCTS: "/dummy/products",
    POST_DETAIL: "/posts/:postId",
    getPostDetail: (postId) => `/posts/${postId}`,
    PRODUCTS_DETAIL: "/products/:productId",
    getProductDetail: (productId) => `/products/${productId}`,
    PRODUCTSLIST: "productslist",
    CARTSLIST: "cartslist",
    POSTSLIST: "postslist",
  },
};

export default PATHS;
