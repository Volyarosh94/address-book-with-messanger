import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { Avatar, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { selectChat } from "./Redux/Chatting/action";
import { makeSearchApi } from "./Redux/Searching/action";
import { removeSeenMsg } from "./Redux/Notification/action";
import { accessChat, makeRecentChatApi } from "./Redux/RecentChat/action";
import { User } from "./Redux/Auth/reducer";
import { Chat } from "./Redux/RecentChat/reducer";
import { Message } from "./Redux/Chatting/reducer";

export const MyChat = () => {
	const [search, setSearch] = useState(false);
	const { search_result, loading, error } = useAppSelector(
		(store) => store.search
	);
	const { recent_chat, loading: chat_loading } = useAppSelector(
		(store) => store.recentChat
	);

	const chatIsOpen = useAppSelector((store) => store.chatting.chatIsOpen);
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
		<div
			className={`md:w-[26%] h-screen bg-[#f5f7fb] text-cont-gray ${
				chatIsOpen ? "chatFull" : "chatSmall"
			} md:block md:min-w-[270px]`}
		>
			<div className="py-5">
				<div className="flex items-center m-auto justify-between w-[80%]">
					<h2 className="text-cont-gray text-2xl font-semibold">Chats</h2>
					{/* <NotificationsIcon /> */}
					<div className={`md:block ${chatIsOpen ? "" : "hidden"}`}>
						<Badge badgeContent={notification} color="error">
							<Notificationcomp />
						</Badge>
					</div>
					{/* <AddIcon /> */}
				</div>
				<div className={`md:flex search-cont ${chatIsOpen ? "" : "hidden"}`}>
					<SearchIcon />
					<input
						onChange={handleQuery}
						type="text"
						placeholder="Search users"
					/>
				</div>
			</div>
			<div className="w-full m-auto">
				<p className="text-cont-gray font-semibold pl-5 pb-5">Recent</p>
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
						  chatting &&
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
	latestMessage?: Message;
	isGroupChat: boolean;
	users: User[];
	groupAdmin: User;
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
	const chatIsOpen = useAppSelector((store) => store.chatting.chatIsOpen);
	const dispatch = useDispatch();
	const user = users.find((el) => el._id != id);
	const handleSelectChat = () => {
		if (user) {
			dispatch(
				selectChat({
					isGroupChat,
					index,
					user: user,
					_id,
					chatName,
				})
			);
		}
	};
	return (
		<div
			onClick={handleSelectChat}
			className={chattingwith == _id ? "user selectUser" : "user"}
		>
			<div className="history-cont">
				{isGroupChat ? (
					<div className="">{<Avatar>G</Avatar>}</div>
				) : (
					<div>{<Avatar src={users.find((el) => el._id != id)?.pic} />}</div>
				)}
				<div className={`md:block ${chatIsOpen ? "" : "hidden"}`}>
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
			<div className={`md:block ${chatIsOpen ? "" : "hidden"}`}>
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
	recent_chat?: Chat[];
	setSearch?: (value: boolean) => void;
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
		dispatch(accessChat(_id, token!, recent_chat!) as unknown as Action);
		if (setSearch) setSearch(false);
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
