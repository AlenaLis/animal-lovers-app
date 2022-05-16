const router = require('express').Router();
const {catchErrors} = require('../handlers/errorHandlers');
const chatroomController = require('../controllers/message');

const auth = require('../middlewares/auth');

router.get('/:id', auth, catchErrors(chatroomController.getMessages));

module.exports = router;
