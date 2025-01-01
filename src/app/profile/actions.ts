"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function updateProfile(data) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("You must be logged in to update your profile")
  }

  const client = await clientPromise
  const usersCollection = client.db().collection("users")

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(session.user.id) },
    { $set: data }
  )

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update profile")
  }
}

export async function updateAvatar(avatarDataUrl) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("You must be logged in to update your avatar")
  }

  // Here you would typically upload the image to a cloud storage service
  // and get back a URL. For this example, we'll just store the data URL.

  const client = await clientPromise
  const usersCollection = client.db().collection("users")

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(session.user.id) },
    { $set: { image: avatarDataUrl } }
  )

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update avatar")
  }
}

