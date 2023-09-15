const Koa = require("koa");
const InitManager = require("./core/init");
require("dotenv").config();
// 获取参数
const parser = require("koa-bodyparser");
//全局报错
const catchError = require("./middlewares/exception");
const app = new Koa();
app.use(catchError);
app.use(parser());

InitManager.initCore(app);
app.listen(3000);
