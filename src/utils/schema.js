import { z } from "zod";

export const fileSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  fileSize: z.string().min(1, "File size is required"),
  fileType: z.string().min(1, "File type is required"),
  id: z.number(),
  progress: z.number(),
  uri: z.string().url(),
});

export const issueSchema = z.object({
  description: z.string().min(5, "Description must be at least 5 characters"),
  issueName: z.string().min(3, "Issue name must be atleast 3 characters"),
});
