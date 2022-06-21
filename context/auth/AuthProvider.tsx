import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import AuthReducer, { Action } from "../../reducer/AuthReducer";
import { AuthContext } from "./AuthContext";
import { AuthReducerState, LoginData } from "./Interfaces";
import * as authService from "../../services/auth.service";
import { useRouter } from "next/router";

const initialState: AuthReducerState = {
  user: {},
  isLogedIn: false,
};

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch]: [AuthReducerState, any] = useReducer(
    AuthReducer,
    initialState
  );

  const router = useRouter();

  useEffect(() => {
    relogedConnectedUser();
    implementAxiosInterceptor();
  }, []);
  // fetch access_token every route change
  useEffect(() => {
    setAxiosDefaultAuthorisation()
  }, [router.pathname]);

  const login = async (data: LoginData) => {
    if (!data.access_token) {
      throw { message: "access token not found" };
    }
    // Store access token in local storage
    await localStorage.setItem("access_token", data.access_token);
    await setAxiosDefaultAuthorisation();
    delete data.access_token;
    dispatch({ type: Action.LOGIN, payload: data });
  };

  const logout = async () => {
    localStorage.removeItem("access_token");
    dispatch({ type: Action.LOGOUT });
  };

  const relogedConnectedUser = async () => {
    setLoading(true);
    await setAxiosDefaultAuthorisation();
    try {
      const user = await authService.getLogedUser();
      if (user) {
        dispatch({ type: Action.LOGIN, payload: user });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const setAxiosDefaultAuthorisation = async () => {
    const access_token = await localStorage.getItem("access_token");
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    }
  };

  const implementAxiosInterceptor = () => {
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log(error.response);
        if (error.response.status === 401) {
          dispatch({type: Action.LOGOUT});
          if (router.pathname === '/forgot') {
              router.push("/forgot");
          }
          if (router.pathname != '/forgot') {
              router.push("/login");
          }
        }
        return Promise.reject(error);
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{ isLogedIn: state.isLogedIn, user: state.user, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
