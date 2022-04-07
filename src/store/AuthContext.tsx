import { getCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ResponseSignIn } from "@/types/auth";

type AuthState = {
  authenticated: boolean;
  user: ResponseSignIn | null;
  loading: boolean;
};
type Action =
  | { type: "LOGIN"; payload: ResponseSignIn }
  | { type: "POPULATE"; payload: ResponseSignIn }
  | { type: "LOGOUT" }
  | { type: "STOP_LOADING" };
type Dispatch = React.Dispatch<Action>;

const StateContext = createContext<AuthState>({
  authenticated: false,
  user: null,
  loading: true,
});
const DispatchContext = createContext<Dispatch>((value: Action) => {});

const reducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case "POPULATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = getCookie("user");

        if (user === null || user === undefined) {
          return;
        }

        dispatch({ type: "LOGIN", payload: JSON.parse(user as string) });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        localStorage.removeItem("token");
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch: () => Dispatch = () =>
  useContext(DispatchContext);
