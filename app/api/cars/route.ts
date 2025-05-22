// app/cars/route.ts
import { prisma } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newCar = await prisma.car.create({ data: body })
    return NextResponse.json(newCar)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}
