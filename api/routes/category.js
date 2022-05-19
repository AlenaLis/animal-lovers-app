const express = require('express')
const upload = require('../middlewares/upload')
const controller = require('../controllers/category')
const {catchErrors} = require("../handlers/errorHandlers");

const router = express.Router()

router.get('/', catchErrors(controller.getAll))
router.get('/:id', catchErrors(controller.getById))
router.get('/article/:id', catchErrors(controller.getByIdOneArt))
router.delete('/:id', catchErrors(controller.remove))
router.post('/', upload.single('imageSrc'), catchErrors(controller.create))
router.patch('/:id', upload.single('image'), catchErrors(controller.update))
router.patch('/article/:id', upload.single('image'), catchErrors(controller.countWatch))

module.exports = router
