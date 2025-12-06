// backend/src/services/etherscanService.js
import axios from 'axios';
import {
  ETHERSCAN_API_KEY,
  ETHERSCAN_BASE_URL,
  BASE_CHAIN_ID
} from '../config.js';

const client = axios.create({
  baseURL: ETHERSCAN_BASE_URL,
  timeout: 12000
});

/**
 * Deeply search the given value for the first Array encountered.
 * Works for:
 * - result: [...]
 * - result: { transactions: [...] }
 * - result: { data: { records: [...] } }
 * - nested combos
 */
const extractArray = (result) => {
  if (!result) return [];

  if (Array.isArray(result)) return result;

  const visited = new Set();
  const stack = [result];

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== 'object') continue;
    if (visited.has(current)) continue;
    visited.add(current);

    if (Array.isArray(current)) return current;

    for (const key of Object.keys(current)) {
      const value = current[key];
      if (Array.isArray(value)) {
        return value;
      }
      if (value && typeof value === 'object') {
        stack.push(value);
      }
    }
  }

  return [];
};

// Safely call Etherscan/BaseScan v2 with robust error handling
const safeGet = async (params) => {
  if (!ETHERSCAN_API_KEY) {
    console.warn('[Etherscan] Missing ETHERSCAN_API_KEY, returning empty data');
    return { status: '0', message: 'NO_API_KEY', result: [] };
  }

  try {
    const response = await client.get('', {
      params: {
        chainid: BASE_CHAIN_ID,
        apikey: ETHERSCAN_API_KEY,
        ...params
      }
    });

    if (!response?.data) {
      return { status: '0', message: 'EMPTY_RESPONSE', result: [] };
    }

    return response.data;
  } catch (err) {
    console.error('[Etherscan] API error:', err.message);
    return {
      status: '0',
      message: 'REQUEST_ERROR',
      result: []
    };
  }
};

/**
 * Build a "pseudo" normal tx object from a token transfer record.
 * Used when txlist endpoint is empty, so that analytics still work.
 */
const buildPseudoTxFromToken = (t) => {
  return {
    hash: t.hash,
    timeStamp: t.timeStamp,
    from: t.from,
    // if direct "to" missing, fallback to contractAddress
    to: t.to || t.contractAddress,
    // some token endpoints use gasUsed, some only gas
    gasUsed: t.gasUsed || t.gas || '0',
    gasPrice: t.gasPrice || '0',
    // mark as contract interaction
    input: '0xFAKE_TOKEN_TX'
  };
};

export const getNormalTransactions = async (address) => {
  // 1) try real txlist
  const data = await safeGet({
    module: 'account',
    action: 'txlist',
    address,
    sort: 'asc'
  });

  if (data.status && data.status !== '1') {
    console.warn('[Etherscan] txlist error or empty:', data.message);
  }

  let txs = extractArray(data.result);
  console.log('[Etherscan] txlist length:', txs.length);

  // 2) If txlist is truly empty BUT there are token transfers,
  //    synthesize "normal" txs from tokentx so analytics are not all zero.
  if (!txs.length) {
    console.log(
      '[Etherscan] txlist empty, attempting synthetic transactions from tokentx fallback...'
    );

    const tokenData = await safeGet({
      module: 'account',
      action: 'tokentx',
      address,
      sort: 'asc'
    });

    const tokenTxs = extractArray(tokenData.result);
    console.log('[Etherscan] tokentx length (for synthetic tx):', tokenTxs.length);

    if (tokenTxs.length) {
      txs = tokenTxs.map(buildPseudoTxFromToken);
      console.log(
        '[Etherscan] built synthetic txs from tokentx:',
        txs.length
      );
    }
  }

  return txs;
};

export const getTokenTransfers = async (address) => {
  const data = await safeGet({
    module: 'account',
    action: 'tokentx',
    address,
    sort: 'asc'
  });

  if (data.status && data.status !== '1') {
    console.warn('[Etherscan] tokentx error or empty:', data.message);
  }

  const tokenTxs = extractArray(data.result);
  console.log('[Etherscan] tokentx length:', tokenTxs.length);
  return tokenTxs;
};
