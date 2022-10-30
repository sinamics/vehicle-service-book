import { withAuth } from "next-auth/middleware";

// Dodaj wszystkie ścieżki z wyjątkiem strony głównej
export const config = { matcher: ["/app"] };

export default withAuth({});
