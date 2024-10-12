import express from 'express';
import  authMiddleware  from '../../middlewares/authMiddleware.js';
import { createConversationCtrl, getConversationCtrl, getOurConversationCtrl } from '../../controllers/chats/ConversationCtrl.js';
const route = express.Router();

route.post('/new', createConversationCtrl);
route.get('/:userId', getConversationCtrl);
route.get('/our/:firstUserId/:secondUserId', getOurConversationCtrl);

export default route;