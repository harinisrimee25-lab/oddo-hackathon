
'use server';
/**
 * @fileOverview A flow for generating a financial summary based on profit and loss data.
 *
 * - generateFinancialSummary - A function that generates the summary.
 * - GenerateFinancialSummaryInput - The input type for the flow.
 * - GenerateFinancialSummaryOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ProfitLossEntrySchema = z.object({
  day: z.string(),
  profit: z.number(),
});

const GenerateFinancialSummaryInputSchema = z.record(
  z.string(),
  z.array(ProfitLossEntrySchema)
);
export type GenerateFinancialSummaryInput = z.infer<typeof GenerateFinancialSummaryInputSchema>;

const WarehouseSummarySchema = z.object({
  warehouseName: z.string().describe('The name of the warehouse.'),
  totalProfit: z.number().describe('The total profit for the week for this warehouse.'),
  summary: z.string().describe('A 2-3 sentence summary of the financial performance for this warehouse, highlighting trends, best/worst days, and any anomalies.'),
});

const GenerateFinancialSummaryOutputSchema = z.object({
  overallSummary: z.string().describe('A 3-4 sentence high-level summary of the entire business\'s weekly performance across all warehouses.'),
  totalProfit: z.number().describe('The total combined profit from all warehouses.'),
  bestPerformingWarehouse: z.string().describe('The name of the warehouse with the highest total profit.'),
  lowestPerformingWarehouse: z.string().describe('The name of the warehouse with the lowest total profit.'),
  warehouseSummaries: z.array(WarehouseSummarySchema).describe('An array of summaries for each individual warehouse.'),
});
export type GenerateFinancialSummaryOutput = z.infer<typeof GenerateFinancialSummaryOutputSchema>;

export async function generateFinancialSummary(input: GenerateFinancialSummaryInput): Promise<GenerateFinancialSummaryOutput> {
  return generateFinancialSummaryFlow(input);
}

const summaryPrompt = ai.definePrompt({
  name: 'financialSummaryPrompt',
  input: { schema: GenerateFinancialSummaryInputSchema },
  output: { schema: GenerateFinancialSummaryOutputSchema },
  prompt: `You are a financial analyst AI. Your task is to provide a clear and concise summary of the weekly profit and loss data for a multi-warehouse business.

Analyze the following data, which is provided as a JSON object where keys are warehouse names and values are arrays of daily profit/loss data for the week.

Data:
\`\`\`json
{{{jsonStringify input}}}
\`\`\`

Based on the data, provide the following:
1.  An overall summary of the business's performance for the week.
2.  The total combined profit across all warehouses.
3.  Identify the best and lowest performing warehouses by total profit.
4.  For each warehouse, provide its total profit and a brief summary of its weekly performance. Note any significant positive or negative days.

Your entire output must be in a valid JSON object that conforms to the provided output schema.
`,
});

const generateFinancialSummaryFlow = ai.defineFlow(
  {
    name: 'generateFinancialSummaryFlow',
    inputSchema: GenerateFinancialSummaryInputSchema,
    outputSchema: GenerateFinancialSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await summaryPrompt({ input, jsonStringify: JSON.stringify });
    if (!output) {
      throw new Error('Failed to generate financial summary from the model.');
    }
    return output;
  }
);
