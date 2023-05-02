import { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

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
      domain: ".hello.localhost",
    });
    Cookies.set("accessToken", tokens.accessToken, {
      domain: ".hello.localhost",
    });
    Cookies.set("refreshToken", tokens.refreshToken, {
      domain: ".hello.localhost",
    });

    const decodedToken = jwtDecode(tokens.idToken);
    const appOrgUserRoleIds = !decodedToken["custom:appOrgUserRoles"]
      ? []
      : decodedToken["custom:appOrgUserRoles"]
          .split(",")
          .map((id) => id.trim());

    const user = {
      id: decodedToken.sub,
      isConfirmed: decodedToken.email_verified,
      email: decodedToken.email,
      appOrgUserRoleIds,
    };

    dispatch({
      type: "LOGIN",
      payload: { data: user, tokens },
    });
  };

  const logout = () => {
    Cookies.remove("jwtTokens");
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
          domain: ".hello.localhost",
        });
        Cookies.remove("accessToken", {
          domain: ".hello.localhost",
        });
        Cookies.remove("refreshToken", {
          domain: ".hello.localhost",
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
