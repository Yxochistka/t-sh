// app/orders/[id]/route.ts
import { prisma } from '../../../lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(params.id) },
      include: {
        car: true,
        orderServices: {
          include: { service: true },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Delete old services and add new ones
    const updatedOrder = await prisma.order.update({
      where: { id: Number(params.id) },
      data: {
        carId: body.carId,
        orderTime: new Date(body.orderTime),
        totalPrice: body.totalPrice,
        status: body.status,
        orderServices: {
          deleteMany: {},
          create: body.serviceIds.map((serviceId: number) => ({
            service: { connect: { id: serviceId } },
          })),
        },
      },
      include: {
        orderServices: true,
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
