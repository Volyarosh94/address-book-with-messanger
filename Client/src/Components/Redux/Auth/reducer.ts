import {
  AUTH_USER,
  AUTH_LOADING,
  AUTH_ERROR,
  LOGOUT,
  UPLOAD_PIC,
} from "./action";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  user: User;
  loading: boolean;
  error: boolean;
  token: string;
}

const user: { token: string; user: User } = JSON.parse(
  localStorage.getItem("userInfo")!
) || {
  user: {},
  token: "",
};

const initState: InitialState = {
  user: user.user,
  loading: false,
  error: false,
  token: user.token,
};

type ActionPayloadType =
  | { type: typeof AUTH_USER; payload: { token: string; user: User } }
  | {
      type: typeof UPLOAD_PIC;
      payload: string;
    }
  | {
      type: typeof AUTH_ERROR | typeof AUTH_LOADING;
      payload: boolean;
    }
  | { type: typeof LOGOUT; payload: any };

export const authReducer = (
  state = initState,
  { type, payload }: ActionPayloadType
): InitialState => {
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        user: payload.user,
        loading: false,
        error: false,
        token: payload.token,
      };
    case UPLOAD_PIC:
      return {
        ...state,
        user: { ...state.user, pic: payload },
        loading: false,
        error: false,
      };
    case AUTH_ERROR:
      return { ...state, error: payload };
    case AUTH_LOADING:
      return { ...state, loading: payload };
    case LOGOUT:
      // return logoutState;
      return state;
    default:
      return state;
  }
};
