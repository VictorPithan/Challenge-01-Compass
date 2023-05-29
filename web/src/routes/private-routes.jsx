import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/auth-context";

export function PrivateRoute({ Screen }) {
    const { _token } = useAuthProvider();

    if(_token) {
        return <Screen />
    }

    return <Navigate to="/" />
}