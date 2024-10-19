import Conversation from "../../models/chats/conversation.js";

// Create a new conversation if it doesn't exist or return the existing one
export const createConversationCtrl = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if a conversation between these two users already exists
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If conversation exists, return it
    if (conversation) {
      return res.status(200).json(conversation);
    }

    // Otherwise, create a new conversation
    const newConversation = await Conversation.create({
      members: [senderId, receiverId],
    });

    return res.status(201).json(newConversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while creating the conversation",
    });
  }
};

// Get conversations for a specific user
export const getConversationCtrl = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all conversations where the user is a member
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });

    if (!conversation.length) {
      return res.status(404).json({ message: "No conversations found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching conversations",
    });
  }
};

// Get a conversation between two specific users
export const getOurConversationCtrl = async (req, res) => {
  try {
    const { firstUserId, secondUserId } = req.params;

    // Find conversation where both users are members
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching the conversation",
    });
  }
};
