import { Outlet } from "react-router-dom";
import HeaderMain from "../../header";

function RootLayout() {
    return (
        <>
            <HeaderMain />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
