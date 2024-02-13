import React from "react";
import RootLayout from "../pages/root";
import ErrorPage from "../pages/error";
import Home from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import ProjectDetailPage from "../pages/projectDetailPage";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "portfolio",
                element: <Portfolio />,
                children: [
                    {
                        path: ":projectId",
                        element: <ProjectDetailPage />,
                    },
                ],
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
        ],
    },
];

export default routes;
