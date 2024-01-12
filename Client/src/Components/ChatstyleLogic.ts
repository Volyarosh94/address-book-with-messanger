import { Message } from "./Redux/Chatting/Reducer";

export const ChatlogicStyling = (id: string, userId: string) => {
  if (id != userId) {
    return "left-msg";
  }
  return "right-msg";
};

export const isSameSender = (messages: Message[], index: number) => {
  // && messages[index - 1]
  if (messages.length - 1 == index) {
    return true;
    // return messages[index].sender._id != messages[index - 1].sender._id;
  }
  return (
    index < messages.length - 1 &&
    messages[index].sender._id != messages[index + 1].sender._id
  );
};
