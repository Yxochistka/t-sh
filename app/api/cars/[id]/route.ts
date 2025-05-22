import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const car = await prisma.car.findUnique({ where: { id } });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { customerId, licensePlate, brand, model, color } = await req.json();

    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        customerId,
        licensePlate,
        brand,
        model,
        color,
      },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.car.delete({ where: { id } });

    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
