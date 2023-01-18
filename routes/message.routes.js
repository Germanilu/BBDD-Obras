const messageController = require('../controllers/MessageController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/newMessage/:id', verifyToken,checkRole, messageController.create);
router.get('/messages/:id',verifyToken,messageController.getAllMessage);
router.delete('/message/:id',verifyToken,messageController.delete);
router.put('/message/:id',verifyToken,messageController.update);

module.exports = router;