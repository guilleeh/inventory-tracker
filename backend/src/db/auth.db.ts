import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// READ

const getSingleUserByEmailDb = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  return user;
};

const getSingleUserByIdDb = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  return user;
};

// CREATE
const createUserDb = async (email: string, password: string, name: string) => {
  const result = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  return result;
};

module.exports = {
  getSingleUserByEmailDb,
  getSingleUserByIdDb,
  createUserDb,
};
