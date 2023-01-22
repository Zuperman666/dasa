import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {DefaultPage} from './pages/DefaultPage/DefaultPage.component';
import './index.css'
import { TablePage } from "pages/TablePage/TablePage.component";
import { UserPage } from "pages/UserPage/UserPage.component";
import { ProductPage } from "pages/ProductPage/ProductPage.component";
import { GiriniPage } from "pages/GiriniPage/GiriniPage.component";
import { TipiProdottiPage } from "pages/TipiProdottiPage/TipiProdotti.component";
import { ListePrezziPage } from "pages/ListePrezzi/ListePrezzi.component";
import { HistoryPage } from "component/History/History.component";



const router = createBrowserRouter([
  {
    element: <DefaultPage/>,
    path:'/',
    children: [
      {
        path: '/Order',
        element: <TablePage />,
      },
      {
        path: '/History',
        element: <HistoryPage />,
      },
      {
        path: '/Liste',
        element: <ListePrezziPage />,
      },
      {
        path: '/Users',
        element: <UserPage />,
      },
      {
        path: '/Girini',
        element: <GiriniPage />,
      },
      {
        path: '/TipiProdotti',
        element: <TipiProdottiPage />,
      },
      {
        path: '/Product',
        element: <ProductPage />,
      }]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);