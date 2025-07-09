import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useAuthStore from "../store/useAuthStore";
import { formatMessageTime } from "../utils/messageTime.util";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    isMessageLoading,
    getMessages,
    isSendingMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const bottomRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1];
          console.log("previousMessage", previousMessage?.senderId);
          const isSameSender = previousMessage?.senderId === message.senderId;
          const isSameTime =
            formatMessageTime(previousMessage?.createdAt) ===
            formatMessageTime(message.createdAt);

          const showHeader = !isSameSender || !isSameTime;
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                {showHeader && (
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "./avatar.png"
                          : selectedUser.profilePic || "./avatar.png"
                      }
                      alt={
                        message.senderId === authUser._id
                          ? authUser.fullName
                          : selectedUser.fullName
                      }
                    />
                  </div>
                )}
              </div>

              {showHeader && (
                <div className="chat-header">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              )}

              {message.image && (
                <img
                  src={message.image}
                  alt="Atthachment"
                  className="w-full sm:max-w-[200px] rounded-md mb-2 border-none"
                />
              )}
              <div className="chat-bubble">
                {message.text && <p>{message.text}</p>}
              </div>

              {/* <div className="chat-footer text-base-content/50">
              {isSendingMessage ? <span>Sending</span> : <span>Delivered</span>}
            </div> */}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
