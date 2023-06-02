import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const order = await prisma.order.create({
      data: { ...req.body },
    });
    res.json(order);
  }
}
