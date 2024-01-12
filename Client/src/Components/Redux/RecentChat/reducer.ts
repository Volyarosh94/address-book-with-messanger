import {
  ADD_RECENT_CHAT,
  NEW_CREATED_CHAT,
  RECENT_ERROR,
  RECENT_LOADING,
} from "./action";

export interface Person {
  _id: string;
  name: string;
  email: string;
  pic: string;
  isAdmin: boolean;
}

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: Person[];
  groupAdmin: Person;
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  recent_chat: Chat[];
  loading: boolean;
  error: boolean;
}

const initState: InitialState = {
  recent_chat: [],
  loading: true,
  error: false,
};

type ActionPayloadType =
  | { type: "ADD_RECENT_CHAT"; payload: Chat[] }
  | {
      type: "NEW_CREATED_CHAT";
      payload: Chat[];
    }
  | { type: "RECENT_ERROR" | "RECENT_LOADING"; payload: boolean };

export const recentChatReducer = (
  store = initState,
  { type, payload }: ActionPayloadType
) => {
  switch (type) {
    case ADD_RECENT_CHAT:
      return {
        ...store,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case NEW_CREATED_CHAT:
      return {
        ...store,
        recent_chat: [...payload, ...store.recent_chat],
        loading: false,
        error: false,
      };
    case RECENT_ERROR:
      return { ...store, error: payload };
    case RECENT_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
