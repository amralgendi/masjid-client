import { createContext, useReducer, useEffect } from "react";
import Constants from "../constants";

const DomainContext = createContext({
  domainDetails: null,
  setDomainDetails: (domainDetails) => {},
});

const domainReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        domainDetails: action.payload,
      };
    default:
      return state;
  }
};

const DomainProvider = (props) => {
  const [state, dispatch] = useReducer(domainReducer, { domainDetails: null });

  const setDomainDetails = (domainDetails) => {
    console.log(domainDetails);
    dispatch({
      type: "SET",
      payload: domainDetails,
    });
  };

  useEffect(() => {
    fetch(`${Constants.apiBase}/saas/domain-details`).then((res) =>
      res.json().then((json) => {
        if (res.ok) {
          setDomainDetails(json);
        } else {
          console.log(json);
        }
      })
    );
  }, []);

  return (
    <DomainContext.Provider
      value={{ domainDetails: state.domainDetails, setDomainDetails }}
      {...props}
    />
  );
};

export { DomainContext, DomainProvider };
