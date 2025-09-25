# Paper RAG

Mastraフレームワークを使用したAIエージェントとワークフロープロジェクト。

## 概要

このプロジェクトは、天気情報取得やQiitaの投稿要約などのAIエージェント機能を提供します。

## Weather Agent LLM API呼び出しフロー

```mermaid
flowchart TD
    A[ユーザーリクエスト受信] --> B{位置情報が含まれているか？}

    B -->|No| C[LLM API Call #1<br/>位置情報を要求]
    C --> D[ユーザーから位置情報取得]
    D --> E[LLM API Call #2<br/>天気取得指示]

    B -->|Yes| E

    E --> F[weatherTool実行<br/>- Geocoding API呼び出し<br/>- Weather API呼び出し]

    F --> G[LLM API Call #3<br/>天気データを整形・解釈]

    G --> H[最終レスポンス生成]

    style C fill:#ffcccc
    style E fill:#ffcccc
    style G fill:#ffcccc
    style F fill:#cceeff
```

### LLM API呼び出し回数

- **最小ケース（位置情報が明確）**: 2回
- **一般的なケース（位置情報が不明確）**: 3回

### 外部API呼び出し

- Geocoding API: 1回
- Weather API: 1回

## 使用方法

```bash
# 開発モード
npm run dev

# ビルド
npm run build

# 実行
npm run start
```

## 依存関係

- **@mastra/core**: メインフレームワーク
- **@ai-sdk/openai**: OpenAI統合
- **@mastra/memory**: メモリ管理
- **@mastra/libsql**: データベース連携