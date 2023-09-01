const express = require('express');

const router = express.Router();

const { creatFile, getFiles, getInfo } = require('./files')

router.post('/', creatFile);

router.get('/', getFiles);

router.get('/:filename', getInfo);

module.exports = router;