import { Avatar } from "@mui/material";
import { Navigate } from "react-router-dom";
import { ChattingPage } from "../Components/ChattingPage";
import { MyChat } from "../Components/MyChat";
import { useAppSelector } from "../Components/Redux/hooks";

export const HomeComp = () => {
  const { user, loading, error } = useAppSelector((store) => store.user);
  const { chatting } = useAppSelector((store) => store.chatting);

  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MyChat />
      {chatting._id ? <ChattingPage /> : <MessageStarter {...user} />}
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
    <div className="chattingpage start-msg">
      <div>
        <Avatar src={pic} sx={{ width: 70, height: 70 }} />
        <h3>Welcome, {name}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
