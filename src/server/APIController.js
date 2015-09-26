import {Router} from 'express';
import messagesAPI from './controllers/messages';
import sessionsAPI from './controllers/sessions';
import usersAPI from './controllers/users';

const router = Router();

router.use('/messages', messagesAPI);
router.use('/sessions', sessionsAPI);
router.use('/users', usersAPI);

export default router;