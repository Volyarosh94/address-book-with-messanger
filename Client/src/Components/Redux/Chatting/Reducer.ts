import {
  ADD_MESSAGE,
  MESSAGE_ERROR,
  MESSAGE_LOADING,
  SELECT_CHAT,
  SEND_MESSAGE,
} from "./action";

export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    pic: string;
  };
  content: string;
  chat: any;
  readBy: any[];
  createdAt: string;
  updatedAt: string;
}

interface InitialState {
  chatting: any;
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

type ActionPayloadType =
  | { type: "SELECT_CHAT"; payload: any }
  | {
      type: "SEND_MESSAGE" | "ADD_MESSAGE";
      payload: Message;
    }
  | { type: "MESSAGE_LOADING" | "MESSAGE_ERROR"; payload: boolean };

export const chattingReducer = (
  store = initState,
  { type, payload }: ActionPayloadType
) => {
  switch (type) {
    case SELECT_CHAT:
      return {
        ...store,
        chatting: payload,
        loading: false,
        error: false,
      };
    case SEND_MESSAGE:
      return {
        ...store,
        messages: [...store.messages, payload],
        loading: false,
        error: false,
      };
    case ADD_MESSAGE:
      return { ...store, messages: [payload], loading: false, error: false };
    case MESSAGE_LOADING:
      return { ...store, loading: payload };
    case MESSAGE_ERROR:
      return { ...store, error: payload };
    default:
      return store;
  }
};
