const app = require('express');
const GameRouter = require('./game.js');
const PlayerRouter = require('./player.js');
const History = require('./history.js');
const LoginUserHandler = require('../Controllers/loginController.js');

const router = app.Router();

router.use('/players', PlayerRouter);
router.use('/games', GameRouter);
router.use('/history', History);
// login handler
router.post('/auth/login', LoginUserHandler);
module.exports = router;
