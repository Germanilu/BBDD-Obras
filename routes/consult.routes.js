const consultController = require('../controllers/ConsultController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

//Routes

router.post('/newConsult/:id', verifyToken, consultController.create);


module.exports = router;