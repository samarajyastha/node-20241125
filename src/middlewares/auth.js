import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const cookie = req.headers.cookie;

  if (!cookie) return res.status(401).send("Unauthorized.");

  const authToken = cookie.split("=")[1];

  if (!authToken) return res.status(401).send("Unauthorized.");

  jwt.verify(authToken, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      res.status(400).send(error.message);
    }

    req.user = data;

    next();
  });
}

export default auth;