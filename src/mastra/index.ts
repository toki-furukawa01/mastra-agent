
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { qiitaPostSummarizeAgent } from './agents/qiita-post';
import { qiitaPostSummarizeAgentNoTool } from './agents/qiita-post-no-tools';
import { weatherAnalyzeAgent } from './agents/weather-analyze-agent';
import { createLogger } from "@mastra/core/logger";
import { LangfuseExporter } from 'langfuse-vercel';
import { weatherMcpServer } from './mcp/mcp-server';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, qiitaPostSummarizeAgent, qiitaPostSummarizeAgentNoTool, weatherAnalyzeAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  // mcp serverの設定
  mcpServers: { weatherMcpServer },
  // Langfuseの設定
  logger: createLogger({
    name: "Mastra",
    level: "debug", //開発用の設定
  }),
  telemetry: {
    serviceName: "ai",
    enabled: true,
    sampling: {
      type: "always_on", // 開発用の設定、すべてのトレースを取得
    },
    export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_BASEURL,
      }),
    },
  },
});
