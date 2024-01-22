import { Avatar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import InputEmoji from "react-input-emoji";
import { RefObject, useEffect, useRef, useState } from "react";
import { ChatlogicStyling, isSameSender } from "../utils";
import {
  fetchCurrentMessages,
  sendMessageApi,
} from "./Redux/Chatting/action.js";
import { sendMessage } from "./Redux/Chatting/action.js";
import { addUnseenmsg } from "./Redux/Notification/action.js";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useAppDispatch, useAppSelector } from "./Redux/hooks.js";
import { Action } from "redux";
import { Message } from "./Redux/Chatting/reducer.js";

const SERVER_POINT = "https://messanger-br6c.onrender.com";
let currentChattingWith: string;
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const ChattingPage = () => {
  const { user, token } = useAppSelector((store) => store.user);
  const { messages } = useAppSelector((store) => store.chatting);
  const { unseenmsg } = useAppSelector((store) => store.notification);
  const { chatting } = useAppSelector((store) => store.chatting);
  const {
    isGroupChat,
    chatName,
    user: { pic, name },
    _id,
  } = chatting || { user: {} };
  const dispatch = useAppDispatch();
  const scrolldiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(SERVER_POINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      // setconnectedtosocket(true);
    });
  }, []);

  useEffect(() => {
    //_id is of selected chat so that user can join same chat room
    if (!_id) return;
    dispatch(fetchCurrentMessages(_id, token, socket) as unknown as Action);
    currentChattingWith = _id;
  }, [_id]);

  useEffect(() => {
    const scrollToBottom = (node: RefObject<HTMLDivElement>) => {
      if (node.current) {
        node.current.scrollTop = node.current.scrollHeight;
      }
    };
    if (scrolldiv.current)
      scrollToBottom(scrolldiv.current as unknown as RefObject<HTMLDivElement>);
  });

  useEffect(() => {
    socket.on("message recieved", (newMessage: Message) => {
      if (!currentChattingWith || currentChattingWith !== newMessage.chat._id) {
        handleNotyfy(newMessage);
      } else {
        dispatch(sendMessage(newMessage));
      }
    });
  }, []);

  const handleNotyfy = (newMessage: Message) => {
    dispatch(addUnseenmsg(newMessage));
  };

  return (
    <div className="chattingpage">
      <div className="flex items-center justify-between p-[15px] border border-[#f0eff5]">
        <div className="flex items-center">
          <Avatar src={isGroupChat ? "" : pic} />
          <p className="text-cont-gray font-semibold ml-[15px]">
            {isGroupChat ? chatName : name}
          </p>
        </div>
        <div>
          <div className="text-icon-gray flex items-center justify-between gap-5 mr-5">
            <SearchIcon />
            <CallIcon />
            <VideoCallIcon />
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <div ref={scrolldiv} className="live-chat">
        {messages.map((el: Message, index: number) => (
          <div
            key={index}
            className={
              el.sender._id != user._id ? "flex" : "flex flex-row-reverse"
            }
          >
            <div
              className={
                el.sender._id != user._id
                  ? "flex flex-row-reverse items-center gap-2.5"
                  : "flex items-center gap-2.5"
              }
            >
              <div className={ChatlogicStyling(el.sender._id, user._id)}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </div>
              {isSameSender(messages, index) ? (
                <Avatar
                  src={el.sender._id != user._id ? el.sender.pic : user.pic}
                />
              ) : (
                <div className="m-5"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex border-t border-t-[#f0eff5] items-center pt-[15px]">
        <InputContWithEmog id={_id!} token={token} socket={socket} />
      </div>
    </div>
  );
};

const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  padding: "12px",
  marginRight: "15px",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));

function InputContWithEmog({
  id,
  token,
  socket,
}: {
  id: string;
  token: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  function handleOnEnter(text: string) {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket
      )
    );
  }
  function handleChatClick() {
    dispatch(
      sendMessageApi(
        {
          content: text,
          chatId: id,
        },
        token,
        socket
      )
    );
    setText("");
  }

  return (
    <>
      <div className="search-cont max-h-9 mt-0">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
      <ColorButton
        onClick={handleChatClick}
        variant="contained"
        endIcon={<SendIcon />}
      />
    </>
  );
}
