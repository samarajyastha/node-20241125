function roleBasedAuth(role) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) {
      return res.status(403).send("Access denied");
    }

    next();
  };
}

export default roleBasedAuth;
