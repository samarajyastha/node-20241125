import jwt from "jsonwebtoken";

function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 86400 });
}

export { createToken };
