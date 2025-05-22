import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function GET() {
  try {
    const cars = await prisma.car.findMany();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { customerId, licensePlate, brand, model, color } = await req.json();

    if (!customerId || !licensePlate || !brand || !model || !color) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCar = await prisma.car.create({
      data: {
        customerId,
        licensePlate,
        brand,
        model,
        color,
      },
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}
