import { deriveSimpleBadges } from '../utils/badges.js';
import {
  buildTimeline,
  buildHabitClock,
  firstAndLastTx,
  topContracts,
  topTokens,
  buildDiary,
  computeBehaviorScores
} from '../utils/analyticsHelpers.js';
import { buildSeasons } from '../utils/seasons.js';

const WEI_PER_ETH = 1e18;

export const computeAnalytics = (transactions = [], tokenTransfers = []) => {
  const totalTransactions = transactions.length;

  let smartContractCalls = 0;
  const contractsSet = new Set();
  let totalGasUsed = 0n;
  let totalGasFeeWei = 0n;

  for (const tx of transactions) {
    const isContractCall = tx.input && tx.input !== '0x';
    if (isContractCall) {
      smartContractCalls += 1;
      if (tx.to) contractsSet.add(tx.to.toLowerCase());
    }

    if (tx.gasUsed) {
      try {
        totalGasUsed += BigInt(tx.gasUsed);
      } catch {
        // ignore parse issues
      }
    }

    if (tx.gasUsed && tx.gasPrice) {
      try {
        const gasUsed = BigInt(tx.gasUsed);
        const gasPrice = BigInt(tx.gasPrice);
        totalGasFeeWei += gasUsed * gasPrice;
      } catch {
        // ignore parse issues
      }
    }
  }

  const uniqueContracts = contractsSet.size;
  const totalGasFeeNative = Number(totalGasFeeWei) / WEI_PER_ETH;

  const tokenTransferCount = tokenTransfers.length;

  const timeline = buildTimeline(transactions);
  const habitClock = buildHabitClock(transactions);
  const { first, last } = firstAndLastTx(transactions);
  const contractsTop = topContracts(transactions, 8);
  const tokensTop = topTokens(tokenTransfers, 8);
  const diary = buildDiary(timeline, { totalTransactions });
  const seasons = buildSeasons(timeline);
  const behavior = computeBehaviorScores(transactions, tokenTransfers);

  const stats = {
    totalTransactions,
    smartContractCalls,
    uniqueContracts,
    totalGasUsed: Number(totalGasUsed),
    totalGasFeeWei: totalGasFeeWei.toString(),
    totalGasFeeNative,
    tokenTransferCount
  };

  const simpleBadges = deriveSimpleBadges(stats);

  const milestones = {
    firstTxAt: first ? first.toISOString() : null,
    lastTxAt: last ? last.toISOString() : null,
    busiestMonth:
      timeline.length > 0
        ? timeline.reduce(
            (best, cur) => (cur.count > best.count ? cur : best),
            timeline[0]
          )
        : null
  };

  const narrativeSummary = {
    stats,
    behavior,
    seasons,
    milestones,
    topContracts: contractsTop,
    topTokens: tokensTop,
    diary,
    tokenTransferCount
  };

  return {
    stats,
    simpleBadges,
    timeline,
    seasons,
    habitClock,
    behavior,
    milestones,
    topContracts: contractsTop,
    topTokens: tokensTop,
    diary,
    narrativeSummary
  };
};
