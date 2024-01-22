import { User } from "../Auth/reducer";
import { Message } from "../Chatting/reducer";
import {
  RECENT_LOADING,
  RECENT_ERROR,
  ADD_RECENT_CHAT,
  NEW_CREATED_CHAT,
} from "./action";

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage: Message;
  groupAdmin: User;
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
  | { type: typeof ADD_RECENT_CHAT; payload: Chat[] }
  | {
      type: typeof NEW_CREATED_CHAT;
      payload: Chat[];
    }
  | {
      type: typeof RECENT_ERROR | typeof RECENT_LOADING;
      payload: boolean;
    };

export const recentChatReducer = (
  state = initState,
  { type, payload }: ActionPayloadType
): InitialState => {
  switch (type) {
    case ADD_RECENT_CHAT:
      return {
        ...state,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case NEW_CREATED_CHAT:
      return {
        ...state,
        recent_chat: [...payload, ...state.recent_chat],
        loading: false,
        error: false,
      };
    case RECENT_ERROR:
      return { ...state, error: payload };
    case RECENT_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
