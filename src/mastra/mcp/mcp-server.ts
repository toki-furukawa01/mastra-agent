import { MCPServer } from "@mastra/mcp";

import { weatherAnalyzeAgent } from "../agents/weather-analyze-agent";
import { weatherSQLTool } from "../tools/weather-sql-tool";

export const weatherMcpServer = new MCPServer({
    id: "weather-mcp-server",
    name: "weather Analyze Server",
    version: "1.0.0",
    agents: { weatherAnalyzeAgent },
    tools: { weatherSQLTool }
});