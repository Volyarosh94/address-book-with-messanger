import { User } from "../Auth/reducer";
import { SEARCH_LOADING, SEARCH_ERROR, SEARCH_RESULT } from "./action";

interface InitialState {
  search_result: User[];
  loading: boolean;
  error: boolean;
}

const initState: InitialState = {
  search_result: [],
  loading: false,
  error: false,
};

type ActionPayloadType =
  | { type: typeof SEARCH_RESULT; payload: User[] }
  | { type: typeof SEARCH_ERROR; payload: boolean }
  | { type: typeof SEARCH_LOADING; payload: boolean };

export const serachReducer = (
  state = initState,
  { type, payload }: ActionPayloadType
): InitialState => {
  switch (type) {
    case SEARCH_RESULT:
      return {
        ...state,
        search_result: payload,
        loading: false,
        error: false,
      };
    case SEARCH_ERROR:
      return { ...state, error: payload };
    case SEARCH_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
