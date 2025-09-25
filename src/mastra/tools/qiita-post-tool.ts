import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { QiitaPostResponse, QiitaTag } from '../../types/qiita';
import { createLogger } from '@mastra/core/logger';

const logger = createLogger({ name: 'qiita-post-tool' });

export const getQiitaPostTool = createTool({
  id: 'get-qiita-post',
  description: 'Qiita API を使用して、指定の記事内容を取得するツール',
  inputSchema: z.object({
    postId: z.string().describe('記事のID'),
  }),
  outputSchema: z.object({
    title: z.string().describe('記事のタイトル'),
    body: z.string().describe('記事の本文'),
    author: z.string().nullable().describe('記事の作者'),
    tags: z.array(z.string()).describe('記事のタグ'),
    createdAt: z.string().describe('記事の作成日時'),
    updatedAt: z.string().describe('記事の更新日時'),
  }),
  execute: async ({ context }) => {
    const postData = await getQiitaPost(context.postId);
    return {
      title: postData.title,
      body: postData.body,
      author: postData.user.name ? postData.user.name : postData.user.id,
      tags: postData.tags.map((tag: QiitaTag) => tag.name),
      createdAt: postData.created_at,
      updatedAt: postData.updated_at,
    };
  },
});


/**
 * 記事の詳細を取得する
 * @param postId 記事のID
 * @returns 記事の詳細
 */
const getQiitaPost = async (postId: string): Promise<QiitaPostResponse> => {
  logger.info(`getQiitaPost tool called with postId: [${postId}]`);
  console.log(`getQiitaPost tool called with postId: [${postId}]`);
  // Qiita API のベース URL
  const baseUrl = 'https://qiita.com/api/v2';

  // 記事の詳細を取得するための API エンドポイント
  const endpoint = `${baseUrl}/items/${postId}`;

  // API リクエストを送信
  const apiKey = process.env.QIITA_API_KEY || '';
  const headers: Record<string, string> = {};
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  const postResponse = await fetch(endpoint, {
    headers,
  });
  const postData = (await postResponse.json()) as QiitaPostResponse;
  logger.info(`postData: ${JSON.stringify(postData)}`);
  return postData;
};