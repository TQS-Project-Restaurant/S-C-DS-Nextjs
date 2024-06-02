import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string,
      role: string,
      token: string,
    },
    expires:string,
  };

  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
  }
}