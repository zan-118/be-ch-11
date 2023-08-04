const app = require('express');
const login = require('../Controllers/Login.controller.js');
const GameRouter = require('./game.js');
const PlayerRouter = require('./player.js');
const History = require('./history.js');

const router = app.Router();

router.use('/players', PlayerRouter);
router.use('/games', GameRouter);
router.use('/history', History);

// login handler
router.post('/auth/login', login);
module.exports = router;
