import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { hash } from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await hash(password, 10)

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    res.status(201).json({ message: 'User created successfully', userId: result.insertedId })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Error creating user' })
  }
}

