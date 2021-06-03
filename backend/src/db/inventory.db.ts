import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllInventoryItemsDb = async (id: number) => {
  const items = await prisma.item.findMany({
    where: { id },
  });

  return items;
};

const createNewInventoryItemDb = async (
  name: string,
  type: string,
  email: string
) => {
  const items = await prisma.item.create({
    data: {
      name,
      type,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  return items;
};

module.exports = {
  getAllInventoryItemsDb,
  createNewInventoryItemDb,
};
