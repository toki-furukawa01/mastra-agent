import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import Database from 'better-sqlite3';

export const weatherSQLTool = createTool({
    id: 'weather-sql-query',
    description: 'Execute SQL queries against the weather measurements database',
    inputSchema: z.object({
        query: z.string().describe('SQL query to execute against weather_measurements table'),
    }),
    outputSchema: z.object({
        results: z.array(z.record(z.any())),
        rowCount: z.number(),
    }),
    execute: async ({ context }) => {
        return await executeWeatherQuery(context.query);
    },
});

async function executeWeatherQuery(query: string) {
    const db = new Database('../../weather_test_data.db');

    try {
        // Log the query for debugging
        console.log('Executing SQL query:', query);

        // Security: Only allow SELECT queries
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery.startsWith('select')) {
            throw new Error('Only SELECT queries are allowed');
        }

        const stmt = db.prepare(query);
        const results = stmt.all();

        // Log the results count
        console.log('Query returned', results.length, 'rows');

        return {
            results: results,
            rowCount: results.length,
        };
    } catch (error) {
        console.error('SQL execution failed:', error);
        throw new Error(`SQL execution failed: ${(error as Error).message}`);
    } finally {
        db.close();
    }
}