import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Наименование обязательно"),
  quantity: z.number().min(1, "Количество должно быть больше 0"),
  pricePerUnit: z.number().min(0.01, "Цена должна быть больше 0"),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
