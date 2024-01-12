import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeSearchApi } from "./Redux/Searching/action";
import { accessChat, makeRecentChatApi } from "./Redux/RecentChat/action";
import { selectChat } from "./Redux/Chatting/action";
import { removeSeenMsg } from "./Redux/Notification/action";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { Action } from "redux";
import { User } from "./Redux/Searching/reducer";
import { Chat, Person } from "./Redux/RecentChat/reducer";

export const MyChat = () => {
  const [search, setSearch] = useState(false);
  const { search_result, loading, error } = useAppSelector(
    (store) => store.search
  );
  const { recent_chat, loading: chat_loading } = useAppSelector(
    (store) => store.recentChat
  );
  const { user, token } = useAppSelector((store) => store.user);
  const { chatting } = useAppSelector((store) => store.chatting);
  const { notification, unseenmsg } = useAppSelector(
    (store) => store.notification
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) dispatch(makeRecentChatApi(token) as unknown as Action);
  }, [user]);
  const ref = useRef<number>();

  const handleQuery = () => {
    return function (e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.value) {
        setSearch(false);
        return;
      }
      if (ref.current) clearTimeout(ref.current);
      setSearch(true);
      ref.current = setTimeout(() => {
        dispatch(makeSearchApi(e.target.value) as unknown as Action);
      }, 1000);
    };
  };

  return (
    <div className="mychat-cont">
      <div className="py-5">
        <div className="notification">
          <h2>Chats</h2>
          {/* <NotificationsIcon /> */}
          <Badge badgeContent={notification} color="error">
            <Notificationcomp />
          </Badge>
          {/* <AddIcon /> */}
        </div>
        <div className="search-cont">
          <SearchIcon />
          <input
            onChange={handleQuery}
            type="text"
            placeholder="Search users"
          />
        </div>
      </div>
      <div className="recent-chat">
        <p className="Recent">Recent</p>
        <div className="recent-user">
          {search
            ? search_result.map((el: User) => (
                <SearchUserComp
                  key={el._id}
                  {...el}
                  token={token}
                  recent_chat={recent_chat}
                  setSearch={setSearch}
                />
              ))
            : !chat_loading &&
              recent_chat.map((el, index: number) => (
                <ChatUserComp
                  key={el._id}
                  {...el}
                  index={index}
                  chattingwith={chatting._id}
                  id={user._id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default function Notificationcomp() {
  const { unseenmsg } = useAppSelector((store) => store.notification);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (unseenmsg.length !== 0) dispatch(removeSeenMsg([]));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <NotificationsIcon
        aria-describedby={id}
        onClick={(e) => handleClick(e)}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {!unseenmsg.length ? (
          <Typography sx={{ p: 2, width: 170 }}>No new messages.</Typography>
        ) : (
          unseenmsg.map((el, index: number) => (
            <Typography key={index} sx={{ p: 2, width: 170 }}>
              {el.sender.name + " " + el.content.substring(0, 15) + "..."}
            </Typography>
          ))
        )}
      </Popover>
    </div>
  );
}

interface ChatUserComp {
  index: number;
  _id: string;
  id: string;
  chatName: string;
  chattingwith: string;
  latestMessage?: any;
  isGroupChat: boolean;
  users: Person[];
  groupAdmin: Person;
  createdAt: string;
  updatedAt: string;
}

const ChatUserComp = ({
  isGroupChat,
  chatName,
  users,
  latestMessage,
  id,
  _id,
  index,
  chattingwith,
}: ChatUserComp) => {
  const dispatch = useDispatch();
  const handleSelectChat = () => {
    dispatch(
      selectChat({
        isGroupChat,
        index,
        user: users.find((el) => el._id != id),
        _id,
        chatName,
      })
    );
  };
  return (
    <div
      onClick={handleSelectChat}
      className={chattingwith == _id ? "user selectUser" : "user"}
    >
      <div className="history-cont">
        {isGroupChat ? (
          <div>{<Avatar>G</Avatar>}</div>
        ) : (
          <div>{<Avatar src={users.find((el) => el._id != id)?.pic} />}</div>
        )}
        <div>
          {isGroupChat ? (
            <p className="name">{chatName}</p>
          ) : (
            <p className="name">{users.find((el) => el._id != id)?.name}</p>
          )}
          <p className="chat">
            {latestMessage
              ? latestMessage.content.length > 8
                ? latestMessage.content.substring(0, 30) + " . . ."
                : latestMessage.content
              : ""}
          </p>
        </div>
      </div>
      <div>
        {latestMessage ? (
          <p className="time">
            {new Date(latestMessage?.updatedAt).getHours() +
              ":" +
              new Date(latestMessage?.updatedAt).getMinutes()}
          </p>
        ) : (
          ""
        )}
        {/* <p className="unseen-chat">5</p> */}
      </div>
    </div>
  );
};

interface SearchUserCompProps {
  _id: string;
  email: string;
  name: string;
  pic: string;
  token?: string;
  recent_chat?: any;
  setSearch?: any;
}

export const SearchUserComp = ({
  _id,
  email,
  name,
  pic,
  token,
  recent_chat,
  setSearch,
}: SearchUserCompProps) => {
  const dispatch = useAppDispatch();
  const handleSubmitForAcceChat = () => {
    dispatch(accessChat(_id, token, recent_chat) as unknown as Action);
    setSearch(false);
  };
  return (
    <div onClick={handleSubmitForAcceChat} className="user">
      <div className="history-cont">
        <div>{<Avatar src={pic} />}</div>
        <div>
          <p className="name">{name}</p>
          <p className="chat">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};
