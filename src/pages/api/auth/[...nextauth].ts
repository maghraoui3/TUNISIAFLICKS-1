import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/src/lib/mongodb'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const client = await clientPromise
        const usersCollection = client.db().collection('users')
        
        // Only fetch necessary fields
        const user = await usersCollection.findOne(
          { email: credentials.email },
          { 
            projection: {
              _id: 1,
              email: 1,
              password: 1,
              name: 1,
              image: 1,
              phone: 1,
              birthdate: 1
            }
          }
        )

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }

        // Return only essential user data
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || null,
          image: user.image || null,
          phone: user.phone || null,
          birthdate: user.birthdate || null,
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store only essential data in the token
        token.id = user.id
        token.email = user.email
        // Optional fields - only include if they exist
        if (user.name) token.name = user.name
        if (user.image) token.picture = user.image
        if (user.phone) token.phone = user.phone
        if (user.birthdate) token.birthdate = user.birthdate
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        // Store only essential data in the session
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string || null
        session.user.image = token.picture as string || null
        session.user.phone = token.phone as string || null
        session.user.birthdate = token.birthdate as string || null
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  // Add cookie configuration
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 30 * 24 * 60 * 60 // 30 days
      }
    }
  }
}

export default NextAuth(authOptions)

