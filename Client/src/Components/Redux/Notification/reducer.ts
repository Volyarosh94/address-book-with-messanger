import { Message } from "../Chatting/reducer";
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
  | { type: typeof ADD_UNSEEN_MSG; payload: Message }
  | { type: typeof REMOVE_SEEN_MSG; payload: Message[] };

export const notyficationReducer = (
  state = initState,
  { type, payload }: ActionPayloadType
): InitialState => {
  switch (type) {
    case ADD_UNSEEN_MSG:
      return {
        ...state,
        unseenmsg: [payload, ...state.unseenmsg],
        notification: state.notification + 1,
      };
    case REMOVE_SEEN_MSG:
      return { ...state, notification: payload.length, unseenmsg: payload };
    default:
      return state;
  }
};
