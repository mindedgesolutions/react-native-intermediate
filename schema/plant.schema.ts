import { validateNumber } from '@/utils/format.validation';
import z from 'zod';

export const plantSchema = z
  .object({
    name: z
      .string()
      .nonempty('Project name is required')
      .max(255, 'Project name cannot be more than 255 characters'),
    startDate: z.coerce.date().optional(),
    timeline: z.string().nonempty('Timeline is required'),
    projectDetails: z
      .string()
      .max(255, 'Project details cannot be more than 255 characters')
      .optional(),
    otherDetails: z
      .string()
      .max(255, 'Other details cannot be more than 255 characters')
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { timeline, startDate } = data;

    if (timeline && !validateNumber(timeline)) {
      ctx.addIssue({
        code: 'custom',
        path: ['timeline'],
        message: 'Invalid number',
      });
    }

    if (timeline && validateNumber(timeline) && Number(timeline) > 200) {
      ctx.addIssue({
        code: 'custom',
        path: ['timeline'],
        message: 'Timeline cannot be more than 365 days',
      });
    }

    if (!startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Start date is required',
      });
    }
  });
export type PlantSchema = z.input<typeof plantSchema>;
