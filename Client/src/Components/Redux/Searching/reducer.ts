import { PayloadAction } from "@reduxjs/toolkit";
import { SEARCH_ERROR, SEARCH_LOADING, SEARCH_RESULT } from "./action";

export interface User {
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
  pic: string;
  _id: string;
}

interface InitState {
  search_result: User[];
  loading: boolean;
  error: boolean;
}

const initState: InitState = {
  search_result: [],
  loading: false,
  error: false,
};

type ActionPayloadType =
  | { type: "SEARCH_RESULT"; payload: User[] }
  | { type: "SEARCH_ERROR"; payload: boolean }
  | { type: "SEARCH_LOADING"; payload: boolean };

export const serachReducer = (
  store: InitState = initState,
  { type, payload }: ActionPayloadType
) => {
  switch (type) {
    case SEARCH_RESULT:
      return {
        ...store,
        search_result: payload,
        loading: false,
        error: false,
      };
    case SEARCH_ERROR:
      return { ...store, error: payload };
    case SEARCH_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
