// app/services/route.ts
import { prisma } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newService = await prisma.service.create({
      data: {
        name: body.name,
        price: body.price,
        durationMin: body.durationMin,
      },
    })

    return NextResponse.json(newService)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
