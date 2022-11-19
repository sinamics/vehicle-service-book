import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const repairRouter = router({
  hello: protectedProcedure
    .input(z.object({ text: z.string().nullish() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
