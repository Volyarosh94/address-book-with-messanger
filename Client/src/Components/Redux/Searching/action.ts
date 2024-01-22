import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { User } from "../Auth/reducer";
import { RootState } from "../store";

export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SEARCH_RESULT = "SEARCH_RESULT";

export const searhcLoding = (payload: boolean) => ({
  type: SEARCH_LOADING,
  payload,
});
export const searchError = (payload: boolean) => ({
  type: SEARCH_ERROR,
  payload,
});
export const searchResult = (payload: User[]) => ({
  type: SEARCH_RESULT,
  payload,
});

export const makeSearchApi =
  (search: string) =>
  async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    searhcLoding(true);
    const user = JSON.parse(localStorage.getItem("userInfo")!) || {};
    const url = `https://messanger-br6c.onrender.com/auth?search=${search}`;
    try {
      let res = await fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      let data = await res.json();
      dispatch(searchResult(data));
    } catch (err: any) {
      dispatch(searchError(true));
      console.log(err.message);
    }
  };
