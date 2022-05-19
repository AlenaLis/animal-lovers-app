const router = require('express').Router();
const {catchErrors} = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));
router.patch('/:id', catchErrors(userController.update))
router.get('/:id', catchErrors(userController.getInfo))

module.exports = router;
