import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const messageController = {
  getUsersForChat: async (req, res) => {
    try {
      const myid = req.user._id;
      const filterUsers = await User.find({ _id: { $ne: myid } }).select(
        "-password"
      );

      return res.status(200).json(filterUsers);
    } catch (error) {
      console.log("Error in getUsersForChat controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { id: receiverId } = req.params;
      const myId = req.user._id;

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: receiverId },
          { senderId: receiverId, receiverId: myId },
        ],
      });

      //   TODO: realtime functionality for messages

      return res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let imageUrl;
      if (image) {
        const uploadResult = await cloudinary.uploader.upload(image);
        imageUrl = uploadResult.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();
      return res.status(200).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default messageController;
