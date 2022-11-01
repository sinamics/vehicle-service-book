import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/((?!auth).*)(.+)"] };

export default withAuth({});
