import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: protectedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
