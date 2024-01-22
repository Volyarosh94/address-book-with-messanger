import { Message } from "../Chatting/reducer";

export const ADD_UNSEEN_MSG = "ADD_UNSEEN_MSG";
export const REMOVE_SEEN_MSG = "REMOVE_SEEN_MSG";

export const addUnseenmsg = (payload: Message) => ({
  type: ADD_UNSEEN_MSG,
  payload,
});
export const removeSeenMsg = (payload: Message[]) => ({
  type: REMOVE_SEEN_MSG,
  payload,
});
