import { Navigate, Outlet} from "react-router-dom";

export const AuthCheck = ()=>{
    const token = sessionStorage.getItem('session');
    if (token){
        return <Navigate to={"/user/dashboard"} />;
    } else {
        return <Outlet />
    }
}

export const Middleware = ()=>{
    const token = sessionStorage.getItem('session');
    if (token) {
        return <Outlet />
    } else {
        return <Navigate to={"/"} />
    }
}
