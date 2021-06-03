const authDb = require("../db/auth.db");
const bcrypt = require("bcrypt");
const jwtService = require("jsonwebtoken");

const createUser = async (email: string, password: string) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const passwordHash: string = await bcrypt.hash(password, salt);
    return await authDb.createUserDb(email, passwordHash);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getSingleUserByEmail = async (email: string) => {
  try {
    return await authDb.getSingleUserByEmailDb(email);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getSingleUserById = async (id: number) => {
  try {
    return await authDb.getSingleUserByIdDb(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkPassword = async (userPassword: string, dbPassword: string) => {
  try {
    return await bcrypt.compare(userPassword, dbPassword);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getJWT = async (id: Number, email: string) => {
  try {
    return jwtService.sign(
      {
        email,
        id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: Number(process.env.JWT_EXPIRE_TIME),
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createUser,
  checkPassword,
  getJWT,
  getSingleUserByEmail,
  getSingleUserById,
};
