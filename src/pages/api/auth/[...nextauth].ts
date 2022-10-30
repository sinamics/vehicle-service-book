import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        return { id: "1", name: "John Doe", email: "teziovsky@gmail.com" };
      },
    }),
  ],
};

export default NextAuth(authOptions);
