import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, durationMin } = await req.json();

    if (!name || price === undefined || durationMin === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        name,
        price,
        durationMin,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
