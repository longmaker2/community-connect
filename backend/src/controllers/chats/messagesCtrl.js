import Message from "../../models/chats/message.js";

export const createMessageCtrl = async (req, res) => {
    const { conversationId, senderId, text } = req.body;
    try {
        const newMessage = await Message.create({
            conversationId,
            senderId,
            text
        })
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while creating the message" });
    }
}

export const getMessagesCtrl = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messages = await Message.find({ conversationId });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong while fetching the messages" });
    }
}