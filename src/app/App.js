import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import "./App.css";

const router = createBrowserRouter(routes);

export default function App() {
    return <RouterProvider router={router} />;
}
