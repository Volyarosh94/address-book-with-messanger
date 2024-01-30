import { User } from "../Auth/reducer";
import { Chat } from "../RecentChat/reducer";
import {
  SELECT_CHAT,
  ADD_MESSAGE,
  MESSAGE_LOADING,
  MESSAGE_ERROR,
  SEND_MESSAGE,
} from "./action";

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  readBy: User[];
  createdAt: string;
  updatedAt: string;
}

export interface SelectChat {
  isGroupChat: boolean;
  index: number;
  user: User;
  _id: string;
  chatName: string;
}
interface InitialState {
  chatting: Partial<SelectChat>;
  messages: Message[];
  loading: boolean;
  error: boolean;
}

const initState: InitialState = {
  chatting: {},
  messages: [],
  loading: false,
  error: false,
};

export type ActionPayloadType =
  | { type: typeof SELECT_CHAT; payload: SelectChat }
  | { type: typeof SEND_MESSAGE; payload: Message }
  | { type: typeof ADD_MESSAGE; payload: Message[] }
  | {
      type: typeof MESSAGE_LOADING | typeof MESSAGE_ERROR;
      payload: boolean;
    };

export const chattingReducer = (
  state = initState,
  { type, payload }: ActionPayloadType
): InitialState => {
  switch (type) {
    case SELECT_CHAT:
      return {
        ...state,
        chatting: payload,
        loading: false,
        error: false,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
        error: false,
      };
    case ADD_MESSAGE:
      return { ...state, messages: payload, loading: false, error: false };
    case MESSAGE_LOADING:
      return { ...state, loading: payload };
    case MESSAGE_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
