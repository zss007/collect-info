/**
 * Created by Administrator on 2017/9/18.
 */
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var notice = require('./json/notice.json');
var app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', sass(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/static'));

// 文件读写
var files = glob.sync('json/*'), date = new Date().toLocaleDateString(), flag = false, userArr = [];
files.forEach(function (filepath) {
    var split = filepath.split('/');
    var name = split[split.length - 1];
    if (name === date + '.json') {
        userArr = require('./' + filepath);
        flag = true;
    }
});
if (!flag) {
    fs.writeFile('./json/' + date + '.json', '[]');
}

// 页面请求
app.get('/', function (req, res, next) {
    res.render('index', {
        date: date,
        notice: notice
    });
});

// 接口请求
app.post('/', function (req, res, next) {
    for (var index in userArr) {
        var user = userArr[index];
        if (user.name === req.body.name) {
            res.send('exist');
            return;
        }
    }
    userArr.push(req.body);
    fs.writeFile('./json/' + date + '.json', JSON.stringify(userArr));
    res.send('success');
});

app.listen('3001', '10.1.23.140');