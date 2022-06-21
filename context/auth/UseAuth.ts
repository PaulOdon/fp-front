import { useContext } from "react"
import { AuthContext } from "./AuthContext"

/**
 * This custom hook instantiates the authentication context and returns it.
 * @returns authContext
 */
export const useAuth = () => {
    const authContext = useContext(AuthContext);
    // Throw an error if the useAuth hook is used outside the AuthProvider context provider component.
    if (authContext === null) {
        throw new Error('useAuth must be inside of AuthProvider');
    }
    return authContext;
}