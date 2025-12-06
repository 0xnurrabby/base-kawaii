import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getNormalTransactions, getTokenTransfers } from '../services/etherscanService.js';
import { computeAnalytics } from '../services/analyticsService.js';
import { generatePersonaAndStory } from '../services/openaiService.js';
import { BASE_CHAIN_ID } from '../config.js';

const router = express.Router();

const isValidAddress = (address) =>
  /^0x[a-fA-F0-9]{40}$/.test(address || '');

// GET /api/wallet/:address/overview
router.get(
  '/:address/overview',
  asyncHandler(async (req, res) => {
    const { address } = req.params;

    if (!isValidAddress(address)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid Ethereum-style address',
          code: 'INVALID_ADDRESS'
        }
      });
    }

    const [txs, tokenTxs] = await Promise.all([
      getNormalTransactions(address),
      getTokenTransfers(address)
    ]);

    const analytics = computeAnalytics(txs, tokenTxs);

    const analyticsSummary = {
      address,
      chainId: BASE_CHAIN_ID,
      ...analytics.narrativeSummary
    };

    const ai = await generatePersonaAndStory(address, analyticsSummary);

    return res.json({
      success: true,
      data: {
        address,
        chainId: BASE_CHAIN_ID,
        stats: analytics.stats,
        simpleBadges: analytics.simpleBadges,
        timeline: analytics.timeline,
        seasons: analytics.seasons,
        habitClock: analytics.habitClock,
        behavior: analytics.behavior,
        milestones: analytics.milestones,
        topContracts: analytics.topContracts,
        topTokens: analytics.topTokens,
        diary: analytics.diary,
        aiPersona: ai.persona,
        aiStory: ai.story,
        meta: {
          usedOpenAI: ai.usedOpenAI,
          usedFallback: ai.usedFallback,
          txCount: txs.length,
          tokenTxCount: tokenTxs.length
        }
      }
    });
  })
);

export default router;
