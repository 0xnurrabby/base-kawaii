import dotenv from 'dotenv';

dotenv.config();

// Backend port
export const PORT = process.env.PORT || 4000;

// ---------  ETHERSCAN / BASESCAN  ---------
export const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/v2/api';
export const BASE_CHAIN_ID = 8453;

// .env theke key nibe, na thakle placeholder (kintu ekhn eikhaneo real key nai)
export const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || 'YOUR_BASESCAN_KEY_HERE';

// ---------  OPENAI  ---------
export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
export const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';

// Debug logs (just show true/false)
console.log('[DEBUG] ETHERSCAN_API_KEY present?', !!process.env.ETHERSCAN_API_KEY);
console.log('[DEBUG] OPENAI_API_KEY present?', !!process.env.OPENAI_API_KEY);
