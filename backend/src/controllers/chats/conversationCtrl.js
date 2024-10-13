import Conversation from "../../models/chats/conversation.js";

export const createConversationCtrl = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = await Conversation.create({
            members: [senderId, receiverId]
        })
        res.status(201).json(newConversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while creating the conversation" });
    }
}

export const getConversationCtrl = async (req, res) => {
    const { userId } = req.params;
    try {
        const conversation = await Conversation.find({ members: { $in: [userId] } });
        if(!conversation) {
            res.status(404).json('Conversation Not found')
        }
        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while fetching the conversation" });
    }
}

export const getOurConversationCtrl = async (req, res) => {
    try {
        const { firstUserId, secondUserId } = req.params;
        const conversation = await Conversation.findOne({ members: { $all: [firstUserId, secondUserId] } });
        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while fetching the conversation" });
    }
}