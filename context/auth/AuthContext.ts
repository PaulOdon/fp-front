import { createContext } from "react";
import { AuthContextValue } from "./Interfaces";

const initialValue: AuthContextValue = {}
export const AuthContext = createContext(initialValue);
