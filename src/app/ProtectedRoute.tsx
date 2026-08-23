import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../features/auth/utils/authStorage";

export default function ProtectedRoute(){
    const token = getAccessToken(); 

    if(!token){
        return <Navigate to="/" replace />
    }

    return <Outlet />;
}