import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const customer = await prisma.customer.findUnique({ where: { id } });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { name, phone, email } = await req.json();

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        phone,
        email,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.customer.delete({ where: { id } });

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
