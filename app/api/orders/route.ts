import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { carId, orderTime, totalPrice, status } = await req.json();

    if (!carId || !orderTime || !totalPrice || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        carId,
        orderDate: new Date(orderTime), // assuming orderTime is a valid date string
        total: totalPrice,
        status,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
