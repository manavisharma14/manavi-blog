// blogSchema.js (optional helper file for reuse)
import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});