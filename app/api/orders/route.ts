// app/orders/route.ts
import { prisma } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        car: true,
        orderServices: {
          include: { service: true },
        },
      },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newOrder = await prisma.order.create({
      data: {
        carId: body.carId,
        orderTime: new Date(body.orderTime),
        totalPrice: body.totalPrice,
        status: body.status,
        orderServices: {
          create: body.serviceIds.map((serviceId: number) => ({
            service: { connect: { id: serviceId } },
          })),
        },
      },
      include: {
        orderServices: true,
      },
    })

    return NextResponse.json(newOrder)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
