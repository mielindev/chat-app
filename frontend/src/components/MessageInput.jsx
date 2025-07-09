import React, { useRef, useState } from "react";
import useChatStore from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !previewImage) return;

    try {
      const messageData = {
        text,
        image: previewImage ? previewImage : "",
      };
      setText("");
      handleRemoveImage();
      await sendMessage(messageData);

      // Clear the form
      setText("");
      handleRemoveImage();
    } catch (error) {
      console.log("Error in sendMessage", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {previewImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={previewImage}
              alt="preview image"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={handleRemoveImage}
              type="button"
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center "
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered input-sm rounded-lg sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              previewImage ? "text-emerald-500" : "text-zinc-400"
            } `}
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text?.trim() && !previewImage}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
