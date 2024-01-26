import { Dispatch } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Message, SelectChat } from "./reducer";

export const SELECT_CHAT = "SELECT_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const MESSAGE_LOADING = "MESSAGE_LOADING";
export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const SEND_MESSAGE = "SEND_MESSAGE";

export const selectChat = (payload: SelectChat) => ({
  type: SELECT_CHAT,
  payload,
});
export const addMessage = (payload: Message) => ({
  type: ADD_MESSAGE,
  payload,
});
export const messageLoading = (payload: boolean) => ({
  type: MESSAGE_LOADING,
  payload,
});
export const messageError = (payload: boolean) => ({
  type: MESSAGE_ERROR,
  payload,
});
export const sendMessage = (payload: Message) => ({
  type: SEND_MESSAGE,
  payload,
});

export const fetchCurrentMessages =
  (
    id: string,
    token: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
  ) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(messageLoading(true));
    const url = `https://messanger-br6c.onrender.com/message/${id}`;
    try {
      let res = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      socket.emit("join chat", id);
      dispatch(addMessage(data));
    } catch (err) {
      console.log(err);
      dispatch(messageError(true));
    }
  };

interface Msg {
  content: string;
  chatId: string;
}

export const sendMessageApi = ((
    msg: Msg,
    token: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
  ) =>
  async (dispatch: Dispatch<any>) => {
    const url = `https://messanger-br6c.onrender.com/message/`;
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(msg),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      socket.emit("new message", data);
      dispatch(sendMessage(data));
    } catch (err: any) {
      console.log(err.message);
    }
  }) as unknown as (
  msg: Msg,
  token: string,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => any;
