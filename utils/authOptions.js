import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.isAdmin = true;
      return session;
    },
    async signIn({ user }) {
      if(user.email === process.env.ADMIN_EMAIL){
        return true;
      }
      return '/unauthorized';
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
