import messageModel from "../models/message.model.js";
import userModel from "./../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await userModel.find({ _id: { $ne: loggedInUser } });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getting users for sidebar", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getMessages = async (req, res) => {
   try {
     const {id:userToChat} = req.params;
     const myId = req.user._id;
     const messages=await messageModel.find({$or:[{sender:myId,receiver:userToChat},{sender:userToChat,receiver:myId}]});
     res.status(200).json(messages);
   } catch (error) {
     console.error("Error in getting messages", error);
     res.status(500).json({ message: "Server Error" });
   }
}


export const sendMessage = async (req, res) => {
  try {
    const {image,text}=req.body;
    const {id:userToChat} = req.params;
    const myId = req.user._id;
    const newMessage=new messageModel({
        sender:myId,
        receiver:userToChat,
        text,
        image
    });

   await newMessage.save();
    {/** socket io code begin here */}
  } catch (error) {
    
  }
}