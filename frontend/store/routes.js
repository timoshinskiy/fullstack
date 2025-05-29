import NF from "../pages/NF.jsx";
import Home from "../pages/Home.jsx";
import Authorize from "../pages/Authorize.jsx";
import Profile from "../pages/Profile.jsx";
import Catalog from "../pages/Catalog.jsx";

export const publicRoutes = [
    {path: '/', element: Home},
    {path: '/profile', element: Profile},
    {path: '/auth', element: Authorize},
    {path: '/marketplace', element: Catalog},
    {path: '*', element: NF}
]
