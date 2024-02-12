// import React from "react";
// import { Route, Routes} from "react-router-dom";
// import withRouter from "../hooks/withRouter"
// import { Home } from "../pages/home";
// import { Portfolio } from "../pages/portfolio";
// import { ContactUs } from "../pages/contact";
// import { About } from "../pages/about";
// import { Socialicons } from "../components/socialicons";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

// const AnimatedRoutes = withRouter(({ location }) => (
//   <TransitionGroup>
//     <CSSTransition
//       key={location.key}
//       timeout={{
//         enter: 400,
//         exit: 400,
//       }}
//       classNames="page"
//       unmountOnExit
//     >
//       <Routes location={location}>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/portfolio" element={<Portfolio />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </CSSTransition>
//   </TransitionGroup>
// ));

// function AppRoutes() {
//   return (
//     <div className="s_c">
//       <AnimatedRoutes />
//       <Socialicons />
//     </div>
//   );
// }

// export default AppRoutes;

//##############################################################################################################

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
