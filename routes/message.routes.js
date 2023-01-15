const messageController = require('../controllers/MessageController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

//Routes

router.post('/newMessage/:id', verifyToken, messageController.create);
router.get('/messages/:id',verifyToken,messageController.getAllMessage);
router.delete('/message/:id',verifyToken,messageController.delete);



module.exports = router;