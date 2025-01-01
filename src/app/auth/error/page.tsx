'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthError({
  error = "An error occurred during authentication",
  status = 400,
}: {
  error?: string
  status?: number
}) {
  const router = useRouter()

  useEffect(() => {
    if (status === 401) {
      setTimeout(() => {
        router.push('/login')
      }, 5000)
    }
  }, [router, status])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>There was a problem with your request</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push('/login')} className="w-full">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

