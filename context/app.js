import { createContext, useReducer, useEffect } from "react";
import Constants from "../constants";

const AppContext = createContext({
  appDetails: null,
  loading: true,
  setAppDetails: (appDetails) => {},
});

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        appDetails: action.payload,
      };
    default:
      return state;
  }
};

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, {
    appDetails: null,
    loading: true,
  });

  const setAppDetails = (appDetails) => {
    dispatch({
      type: "SET",
      payload: appDetails,
      loading: false,
    });
  };

  useEffect(() => {
    fetch(`${Constants.apiBase}/app-details`).then((res) =>
      res.json().then((json) => {
        if (res.ok) {
          setAppDetails(json);
        } else {
          console.log(json);
        }
      })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{ appDetails: state.appDetails, setAppDetails }}
      {...props}
    />
  );
};

export { AppContext, AppProvider };
