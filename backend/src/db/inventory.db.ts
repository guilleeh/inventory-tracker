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

const editInventoryItemDb = async (
  name: string,
  type: string,
  quantity: number,
  id: number
) => {
  const item = await prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      type,
      quantity,
    },
  });

  return item;
};

const deleteInventoryItemDb = async (id: number) => {
  const item = await prisma.item.delete({
    where: {
      id,
    },
  });

  return item;
};

module.exports = {
  getAllInventoryItemsDb,
  createNewInventoryItemDb,
  editInventoryItemDb,
  deleteInventoryItemDb,
};
