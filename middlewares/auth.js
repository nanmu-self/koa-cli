const { Forbidden } = require("../core/http-exception");
const { security } = require("../config/config");
const jwt = require("jsonwebtoken");

// 校验token
const validateToken = async (ctx, next) => {
  let userToken = ctx.request.header.authorization;
  if (!userToken) {
    throw new Forbidden("请先登录");
  }

  try {
    let user = jwt.verify(userToken, security.secretKey);

    ctx.auth = {
      uid: user.uid,
      scope: user.scope,
    };
  } catch (e) {
    throw new Forbidden("请重新登录");
  }

  await next();
};

module.exports = {
  validateToken,
};
