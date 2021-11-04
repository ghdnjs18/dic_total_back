var express = require('express');
var app = express();
var cors = require('cors');
var logger = require('morgan');
var mongmoos = require('mongoose');
var routes = require('./src/routes');

var corsOptions = {
    origin: '*',
    Credential: true
}

// mongoDB 연결 1
const CONNECT_URL = 'mongodb+srv://dicUser:1234@diction.iwcno.mongodb.net/kor_dic_db?retryWrites=true&w=majority'
mongmoos.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("몽고DB 연결중..."))
  .catch(e => console.log('데이터베이스 연결 실패 !: ${e}'))


// 미들웨어
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger('tiny'));

app.use('/api', routes);

app.get('/hello', (req, res) => {
    res.send('hello world !')
})

// 오류 페이지 처리
app.use((req, res, next) => {
    res.status(404).send("페이지를 찾을 수 없습니다.");
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("내부 에러 발생")
})

// 서버 오픈
app.listen(process.env.PORT || 5000, () => {
    console.log('서버 실행중... 포트번호 5000...');
})