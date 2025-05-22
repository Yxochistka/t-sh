// app/order_services/[id]/route.ts
import { prisma } from '../../../lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderService = await prisma.orderService.findUnique({
      where: { id: Number(params.id) },
      include: {
        order: true,
        service: true,
      },
    })

    if (!orderService) {
      return NextResponse.json({ error: 'Order-service not found' }, { status: 404 })
    }

    return NextResponse.json(orderService)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order-service' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const updatedOrderService = await prisma.orderService.update({
      where: { id: Number(params.id) },
      data: {
        orderId: body.orderId,
        serviceId: body.serviceId,
      },
    })

    return NextResponse.json(updatedOrderService)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order-service' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.orderService.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({ message: 'Order-service deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order-service' }, { status: 500 })
  }
}
