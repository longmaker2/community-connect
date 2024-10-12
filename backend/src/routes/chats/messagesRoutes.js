import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { createMessageCtrl, getMessagesCtrl } from '../../controllers/chats/messagesCtrl.js';
const route = express.Router();

route.post('/new',  createMessageCtrl);
route.get('/:conversationId',  getMessagesCtrl);
export default route;