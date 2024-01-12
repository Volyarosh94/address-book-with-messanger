import { Message } from "../Chatting/Reducer";
import { ADD_UNSEEN_MSG, REMOVE_SEEN_MSG } from "./action";

interface InitialState {
  notification: number;
  unseenmsg: Message[];
}

const initState: InitialState = {
  notification: 0,
  unseenmsg: [],
};

type ActionPayloadType =
  | { type: "ADD_UNSEEN_MSG"; payload: Message }
  | { type: "REMOVE_SEEN_MSG"; payload: Message[] };

export const notyficationReducer = (
  store = initState,
  { type, payload }: ActionPayloadType
) => {
  switch (type) {
    case ADD_UNSEEN_MSG:
      return {
        ...store,
        unseenmsg: [payload, ...store.unseenmsg],
        notification: store.notification + 1,
      };
    case REMOVE_SEEN_MSG:
      return { ...store, notification: payload.length, unseenmsg: payload };
    default:
      return store;
  }
};
