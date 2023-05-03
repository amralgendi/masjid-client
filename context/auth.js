import { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Constants from "../constants";

const AuthContext = createContext({
  user: null,
  login: (tokens) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (tokens) => {
    Cookies.set("idToken", tokens.idToken, {
      domain: `.${Constants.host}`,
    });
    Cookies.set("accessToken", tokens.accessToken, {
      domain: `.${Constants.host}`,
    });
    Cookies.set("refreshToken", tokens.refreshToken, {
      domain: `.${Constants.host}`,
    });

    const decodedToken = jwtDecode(tokens.idToken);
    const appOrgUserRoleIds = !decodedToken["custom:appOrgUserRoles"]
      ? []
      : decodedToken["custom:appOrgUserRoles"]
          .split(",")
          .map((id) => id.trim());

    const user = {
      id: decodedToken.email,
      isConfirmed: decodedToken.email_verified,
      email: decodedToken.email,
      appOrgUserRoles: [],
    };

    fetch(
      `${Constants.apiBase}/app-org-user-roles?UserId=${decodedToken.email}`
    ).then((res) =>
      res.json().then((json) => {
        if (res.ok)
          dispatch({
            type: "LOGIN",
            payload: { data: { ...user, appOrgUserRoles: json }, tokens },
          });
      })
    );

    dispatch({
      type: "LOGIN",
      payload: { data: user, tokens },
    });
  };

  const logout = () => {
    Cookies.remove("idToken", {
      domain: `.${Constants.host}`,
    });
    Cookies.remove("accessToken", {
      domain: `.${Constants.host}`,
    });
    Cookies.remove("refreshToken", {
      domain: `.${Constants.host}`,
    });
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    if (Cookies.get("idToken")) {
      const tokens = {
        idToken: Cookies.get("idToken"),
        accessToken: Cookies.get("accessToken"),
        refreshToken: Cookies.get("refreshToken"),
      };

      const decodedToken = jwtDecode(tokens.idToken);

      if (decodedToken.exp * 1000 < Date.now()) {
        Cookies.remove("idToken", {
          domain: `.${Constants.host}`,
        });
        Cookies.remove("accessToken", {
          domain: `.${Constants.host}`,
        });
        Cookies.remove("refreshToken", {
          domain: `.${Constants.host}`,
        });
      } else {
        login(tokens);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
