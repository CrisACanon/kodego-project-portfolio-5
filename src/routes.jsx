import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Brands from "./pages/Brands";
import CreateBrand from "./services/CreateBrand";
import EditBrand from "./services/EditBrand";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import EditUser from "./services/EditUser";
import CreateUser from "./services/CreateUser";
import Products from "./pages/Products";
import CreateProduct from "./services/CreateProduct";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import CreateCategory from "./services/CreateCategory";
import EditCategory from "./services/EditCategory";
import ProductType from "./pages/ProductType";
import CreateProductType from "./services/CreateProductType";
import EditProductType from "./services/EditProductType";
import PromoCarousel from "./pages/PromoCarousel";
import CreatePromo from "./services/CreatePromo";
import Cart from "./pages/Cart";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Shop",
    path: "/shop",
    element: <Shop />,
  },
  {
    name: "Brands",
    path: "/brands",
    element: <Brands />,
  },
  {
    name: "CreateBrand",
    path: "/create/brand",
    element: <CreateBrand />,
  },
  {
    name: "EditBrand",
    path: "/brand/:id/edit",
    element: <EditBrand />,
  },
  {
    name: "Contact",
    path: "/contact",
    element: <Contact />,
  },
  {
    name: "Users",
    path: "/users",
    element: <Users />,
  },
  {
    name: "CreateUser",
    path: "/create/user",
    element: <CreateUser />,
  },
  {
    name: "EditUser",
    path: "/user/:id/edit",
    element: <EditUser />,
  },
  {
    name: "Products",
    path: "/products",
    element: <Products />,
  },
  {
    name: "CreateProduct",
    path: "/create/product",
    element: <CreateProduct />,
  },

  {
    name: "Category",
    path: "/category",
    element: <Category />,
  },
  {
    name: "CreateCategory",
    path: "/create/category",
    element: <CreateCategory />,
  },
  {
    name: "EditCategory",
    path: "/category/:id/edit",
    element: <EditCategory />,
  },
  {
    name: "ProductType",
    path: "/producttype",
    element: <ProductType />,
  },
  {
    name: "CreateProductType",
    path: "/create/producttype",
    element: <CreateProductType />,
  },
  {
    name: "EditProductType",
    path: "/producttype/:id/edit",
    element: <EditProductType />,
  },
  {
    name: "PromoCarousel",
    path: "/promo",
    element: <PromoCarousel />,
  },
  {
    name: "CreatePromo",
    path: "/create/promo",
    element: <CreatePromo />,
  },
  {
    name: "Cart",
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
