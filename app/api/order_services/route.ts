import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function GET() {
  try {
    const orderServices = await prisma.order_Service.findMany();
    return NextResponse.json(orderServices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order_services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, serviceId } = await req.json();

    if (!orderId || !serviceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrderService = await prisma.order_Service.create({
      data: {
        orderId,
        serviceId,
      },
    });

    return NextResponse.json(newOrderService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order_service" }, { status: 500 });
  }
}
