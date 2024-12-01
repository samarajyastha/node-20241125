function logger(req, res, next) {
  const method = req.method;
  const route = req.originalUrl;

  console.log(`Method: ${method} \nUrl: ${route}`);

  if (req.method == "PATCH") {
    return res.status(405).send("PATCH method not allowed.");
  }

  next();
}

export default logger;
