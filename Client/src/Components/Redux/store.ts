import {
  Middleware,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { authReducer } from "./Auth/reducer";
import { chattingReducer } from "./Chatting/reducer";
import { notyficationReducer } from "./Notification/reducer";
import { recentChatReducer } from "./RecentChat/reducer";
import { serachReducer } from "./Searching/reducer";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    user: authReducer,
    search: serachReducer,
    recentChat: recentChatReducer,
    chatting: chattingReducer,
    notification: notyficationReducer,
  },
  middleware: [...getDefaultMiddleware(), loggerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
