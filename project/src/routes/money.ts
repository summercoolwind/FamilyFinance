export {};
const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const User = require('../models/User');
const Pay = require('../models/Pay');
const { ensureAuth } = require('../middleware/auth');

router.get('/summary', ensureAuth, async (req, res, next) => {
    
});