import { Dispatch } from "redux";
import { User } from "./reducer";

export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPLOAD_PIC = "UPLOAD_PIC";

export const actionPic = (payload: string) => ({
  type: UPLOAD_PIC,
  payload,
});
export const authUser = (payload: { token: string; user: User }) => ({
  type: AUTH_USER,
  payload,
});
export const authLoading = (payload: boolean) => ({
  type: AUTH_LOADING,
  payload,
});
export const authError = (payload: boolean) => ({
  type: AUTH_ERROR,
  payload,
});
export const authLogout = () => ({ type: LOGOUT, payload: {} });

interface Props {
  url: string;
  user: {
    email: string;
    password: string;
  };
}

export const authRegister =
  ({ url, user }: Props) =>
  async (dispatch: Dispatch) => {
    dispatch(authLoading(true));
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(authUser(data));
    } catch (err: any) {
      dispatch(authLoading(false));
      dispatch(authError(true));
      console.log(err.message);
    }
  };

export const uploadPic = (pic: string) => async (dispatch: Dispatch) => {
  dispatch(authLoading(true));
  try {
    const url = `https://api.cloudinary.com/v1_1/yasherosion/image/upload`;
    const profile = new FormData();
    profile.append("file", pic);
    profile.append("upload_preset", "chat-app");
    profile.append("cloud_name", "yasherosion");
    let res = await fetch(url, {
      method: "POST",
      body: profile,
    });
    let data = await res.json();
    dispatch(actionPic(data.secure_url));
  } catch (error: any) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(error.message);
  }
};
