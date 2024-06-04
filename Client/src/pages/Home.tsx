import { Avatar } from "@mui/material";
import { useAppSelector } from "../Components/Redux/hooks";
import { ChattingPage } from "../Components/ChattingPage";
import { MyChat } from "../Components/MyChat";

export const HomeComp = () => {
	const { user, loading, error } = useAppSelector((store) => store.user);
	const { chatting } = useAppSelector((store) => store.chatting);

	return (
		<>
			<MyChat />
			{chatting?._id ? <ChattingPage /> : <MessageStarter {...user} />}
		</>
	);
};

export const MessageStarter = ({
	pic,
	name,
}: {
	pic: string;
	name: string;
}) => {
	return (
		<div className="chattingpage w-full flex items-center justify-center">
			<div className="flex items-center flex-col">
				<Avatar src={pic} sx={{ width: 70, height: 70 }} />
				<h3>Welcome, {name}</h3>
				<p className="text-[#7a7f9a] m-0">
					Please select a chat to start messaging.
				</p>
			</div>
		</div>
	);
};
