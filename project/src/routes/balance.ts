export {};
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
// 查询用户余额
router.get('/summary', ensureAuth, async (req, res, next) => {

});

module.exports = router;