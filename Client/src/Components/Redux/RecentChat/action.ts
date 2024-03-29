import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { selectChat } from "../Chatting/action";
import { Chat } from "./reducer";
import { RootState } from "../store";
import { User } from "../Auth/reducer";

export const RECENT_LOADING = "RECENT_LOADING";
export const RECENT_ERROR = "RECENT_ERROR";
export const ADD_RECENT_CHAT = "ADD_RECENT_CHAT";
export const NEW_CREATED_CHAT = "NEW_CREATED_CHAT";

export const recentLoding = (payload: boolean) => ({
  type: RECENT_LOADING,
  payload,
});
export const recentError = (payload: boolean) => ({
  type: RECENT_ERROR,
  payload,
});
export const recentChatResult = (payload: Chat[]) => ({
  type: ADD_RECENT_CHAT,
  payload,
});
export const newCreatedChat = (payload: Chat[]) => ({
  type: NEW_CREATED_CHAT,
  payload,
});

export const makeRecentChatApi =
  (token: string) =>
  async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    recentLoding(true);
    const url = `https://messanger-br6c.onrender.com/chat`;
    try {
      let res = await fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      dispatch(recentChatResult(data));
    } catch (err: any) {
      dispatch(recentError(true));
      console.log(err.message);
    }
  };

interface GroupData {
  name: string;
  users: string[];
}

export const makeNewGroup =
  (group_data: GroupData, token: string) =>
  async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    recentLoding(true);
    const url = `https://messanger-br6c.onrender.com/chat/group`;
    try {
      let res = await fetch(url, {
        method: "post",
        body: JSON.stringify(group_data),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      dispatch(newCreatedChat(data));
    } catch (err: any) {
      dispatch(recentError(true));
      console.log(err.message);
    }
  };

export const accessChat =
  (userId: string, token: string, recentchat: Chat[]) =>
  async (dispatch: ThunkDispatch<RootState, any, AnyAction>) => {
    dispatch(recentLoding(true));
    const url = `https://messanger-br6c.onrender.com/chat`;
    try {
      let res = await fetch(url, {
        method: "post",
        body: JSON.stringify({ userId }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      if (!recentchat.find((el) => el._id === data._id)) {
        dispatch(newCreatedChat(data));
        dispatch(
          selectChat({
            isGroupChat: data.isGroupChat,
            index: 0,
            user: data.users.find((el: User) => el._id == userId),
            _id: data._id,
            chatName: data.chatName,
          })
        );
        return;
      }
      dispatch(recentLoding(false));
      dispatch(
        selectChat({
          isGroupChat: data.isGroupChat,
          index: 0,
          user: data.users.find((el: User) => el._id == userId),
          _id: data._id,
          chatName: data.chatName,
        })
      );
    } catch (err: any) {
      dispatch(recentError(true));
      console.log(err.message);
    }
  };
