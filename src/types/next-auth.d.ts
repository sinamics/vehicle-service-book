import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface DefaultJWT {
    id?: string;
    email?: string;
  }
}
