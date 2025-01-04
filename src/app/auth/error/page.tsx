'use client'

import { useEffect } from 'react'
import { Button } from "@/src/components/ui/button"
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    // Log the error to an error reporting service
    if (error) {
      console.error(error)
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h2 className="text-2xl font-bold mb-4">Authentication Error</h2>
      <p className="text-muted-foreground mb-4">
        {error || "An unexpected error occurred during authentication."}
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => router.push('/login')}>Try again</Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  )
}

