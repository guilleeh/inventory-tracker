import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllInventoryItemsDb = async (id: number) => {
  const items = await prisma.item.findMany({
    where: { userId: id },
  });

  return items;
};

const getSingleInventoryItemDb = async (id: number) => {
  const item = await prisma.item.findFirst({
    where: { id },
  });

  return item;
};

const createNewInventoryItemDb = async (
  name: string,
  type: string,
  quantity: number,
  email: string
) => {
  const items = await prisma.item.create({
    data: {
      name,
      type,
      quantity,
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
  getSingleInventoryItemDb,
  createNewInventoryItemDb,
  editInventoryItemDb,
  deleteInventoryItemDb,
};
