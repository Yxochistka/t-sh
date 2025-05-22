import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const orderService = await prisma.order_Service.findUnique({ where: { id } });

    if (!orderService) {
      return NextResponse.json({ error: "Order_Service not found" }, { status: 404 });
    }

    return NextResponse.json(orderService);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order_service" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { orderId, serviceId } = await req.json();

    const updatedOrderService = await prisma.order_Service.update({
      where: { id },
      data: {
        orderId,
        serviceId,
      },
    });

    return NextResponse.json(updatedOrderService);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order_service" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.order_Service.delete({ where: { id } });

    return NextResponse.json({ message: "Order_Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order_service" }, { status: 500 });
  }
}
