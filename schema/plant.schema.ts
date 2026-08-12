import { validateNumber } from '@/utils/format.validation';
import z from 'zod';

export const plantSchema = z
  .object({
    name: z
      .string()
      .nonempty('Plant name is required')
      .max(255, 'Plant name cannot be more than 255 characters'),
    frequency: z.string().nonempty('Frequency is required'),
  })
  .superRefine((data, ctx) => {
    const { frequency } = data;

    if (frequency && !validateNumber(frequency)) {
      ctx.addIssue({
        code: 'custom',
        path: ['frequency'],
        message: 'Invalid number',
      });
    }
  });
export type PlantSchema = z.infer<typeof plantSchema>;
