const express = require('express') // 외부 모듈 express를 불러온다.
const router = express.Router() // 라우터 기본 세팅 express생성
const word = require('./word')

router.use('/words', word);

module.exports = router;