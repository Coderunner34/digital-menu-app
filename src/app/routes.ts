import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Catering } from "./pages/Catering";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "catering", Component: Catering },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "gallery", Component: Gallery },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "admin", Component: Admin },
    ],
  },
]);
