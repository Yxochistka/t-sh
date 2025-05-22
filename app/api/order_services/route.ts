// app/order_services/route.ts
import { prisma } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const orderServices = await prisma.orderService.findMany({
      include: {
        order: true,
        service: true,
      },
    })
    return NextResponse.json(orderServices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order-services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newOrderService = await prisma.orderService.create({
      data: {
        orderId: body.orderId,
        serviceId: body.serviceId,
      },
    })

    return NextResponse.json(newOrderService)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order-service' }, { status: 500 })
  }
}
