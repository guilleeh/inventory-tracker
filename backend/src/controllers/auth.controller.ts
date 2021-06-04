const authService = require("../services/auth.service");

// GET

const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ success: false, error: "Id is required." });
    next();
    return;
  }

  const numId = Number(id);
  if (Number.isNaN(numId)) {
    res.status(400).json({ success: false, error: "Id must be a number." });
    return;
  }

  try {
    // Find user record
    const user = await authService.getSingleUserById(numId);
    if (!user) {
      res
        .status(404)
        .json({ success: false, error: `User with id: ${numId} not found.` });
      return;
    }

    res.status(200).json({ success: true, data: user });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

// POST

const postCreateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Email and password are required." });
    next();
    return;
  }

  try {
    const json = await authService.createUser(email, password);
    res.json(json);
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const postLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Email and password are required." });
    next();
    return;
  }

  try {
    // Find user record
    const user = await authService.getSingleUserByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, error: "Authentication failed." });
      return;
    }
    // securely compare passwords
    const match = await authService.checkPassword(password, user.password);
    if (!match) {
      res.status(401).json({ success: false, error: "Authentication failed." });
      return;
    }

    // get jwt
    const jwtToken = await authService.getJWT(user.id, user.email);
    res
      .status(200)
      .json({ success: true, data: { jwt: jwtToken, id: user.id } });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  getUser,
  postCreateUser,
  postLoginUser,
};
