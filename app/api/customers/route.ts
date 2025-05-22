// app/customers/route.ts
import { prisma } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const customers = await prisma.customer.findMany()
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newCustomer = await prisma.customer.create({ data: body })
    return NextResponse.json(newCustomer)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
