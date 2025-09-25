import { weatherAnalyzeAgent } from './src/mastra/agents/weather-analyze-agent.js';

async function testWeatherAgent() {
  console.log('=== Weather Analyze Agent Test ===\n');

  try {
    // Test 1: 東京の平均気温
    console.log('Test 1: 東京の1月の平均気温を調べてください');
    const result1 = await weatherAnalyzeAgent.text('東京の1月の平均気温を調べてください');
    console.log('Response:', result1);
    console.log('\n---\n');

    // Test 2: 最も暖かい日
    console.log('Test 2: 最も暖かかった日を教えてください');
    const result2 = await weatherAnalyzeAgent.text('最も暖かかった日を教えてください');
    console.log('Response:', result2);
    console.log('\n---\n');

    // Test 3: 利用可能な地点の確認
    console.log('Test 3: どの地点のデータがありますか？');
    const result3 = await weatherAnalyzeAgent.text('どの地点のデータがありますか？');
    console.log('Response:', result3);
    console.log('\n---\n');

  } catch (error) {
    console.error('Error testing weather agent:', error);
  }
}

testWeatherAgent();