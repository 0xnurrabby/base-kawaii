import { OPENAI_API_KEY, OPENAI_MODEL } from '../config.js';

// Fallback persona + story if OpenAI is missing or fails
const FALLBACK_PERSONA = {
  title: 'Soft-Spoken Base Bunny',
  archetype: 'Cozy Explorer',
  summary:
    'This wallet pads gently across the Base network, curious but careful, sprinkling tiny bursts of activity like pastel confetti.',
  traits: [
    'Gas-conscious but playful',
    'Likes exploring new contracts slowly',
    'Keeps a tidy trail of transactions'
  ]
};

const FALLBACK_STORY =
  'On a quiet corner of the Base chain, a pastel wallet woke up one morning and stretched its little on-chain paws. ' +
  'It did not rush into wild trades or noisy memecoins. Instead, it wandered softly between a few contracts, ' +
  'leaving tiny sparkles of gas behind. Sometimes it sent a friendly token or two, just to say hello. ' +
  'Though its history is still short, this wallet feels full of cozy potential—like a warm blanket waiting ' +
  'for the perfect evening to curl up and dream of bigger, brighter on-chain adventures.';

const buildPrompt = (address, summary) => {
  return [
    {
      role: 'system',
      content:
        'You are a gentle, pastel-aesthetic storyteller living in a cozy fantasy version of the Base blockchain. ' +
        'You ALWAYS keep the tone positive, cozy and hopeful. ' +
        'You never mention prices going down, losses or negativity. ' +
        'You write like a soft fantasy story, but grounded in the wallet data given.'
    },
    {
      role: 'user',
      content:
        `Using the analytics below, do TWO things:\n\n` +
        `1) Return a STRICT JSON object called "persona" with keys:\n` +
        `   - title (string, very cute)\n` +
        `   - archetype (string)\n` +
        `   - summary (2–3 sentences)\n` +
        `   - traits (array of 4–8 short phrases)\n` +
        `2) After the JSON, write a DELIGHTFUL, highly aesthetic story (400–800 words)\n` +
        `   about this wallet. The story must:\n` +
        `   - Reference specific details: milestones, seasons, topTokens, topContracts, tokenTransferCount etc.\n` +
        `   - Be written in the second person ("you") so the wallet owner can emotionally relate.\n` +
        `   - Always focus on kindness, curiosity, and cute metaphors (flowers, stars, pastel colors).\n` +
        `   - Be structured with short paragraphs and line breaks so it is easy to read.\n` +
        `   - Never mention money amounts, profit, loss or USD value.\n` +
        `   - Never be negative or critical.\n\n` +
        `Wallet address: ${address}\n` +
        `Analytics summary:\n` +
        JSON.stringify(summary, null, 2)
    }
  ];
};

export const generatePersonaAndStory = async (address, analyticsSummary) => {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_KEY_HERE') {
    console.warn('[OpenAI] Missing OPENAI_API_KEY, using fallback persona + story');
    return {
      persona: FALLBACK_PERSONA,
      story: FALLBACK_STORY,
      usedOpenAI: false,
      usedFallback: true
    };
  }

  const messages = buildPrompt(address, analyticsSummary);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      console.warn('[OpenAI] Non-OK response:', response.status, response.statusText);
      return {
        persona: FALLBACK_PERSONA,
        story: FALLBACK_STORY,
        usedOpenAI: false,
        usedFallback: true
      };
    }

        const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '';

    let persona = FALLBACK_PERSONA;
    let story = FALLBACK_STORY;

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.title && parsed.summary) {
          persona = parsed;
        }
      }

      // JSON অংশটা কেটে ফেলা
      let afterJson = content.replace(jsonMatch?.[0] || '', '').trim();

      // 🔧 ১) ```json / ``` code block মার্কার গুলো কেটে ফেলা
      // 🔧 ২) আলাদা লাইন হিসেবে থাকা --- / *** / ___ গুলো কেটে ফেলা
      afterJson = afterJson
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .replace(/^\s*[-_*]{3,}\s*$/gm, '') // ← ei line ta notun
        .trim();

      if (afterJson.length > 40) {
        story = afterJson;
      }
    } catch (err) {
      console.warn('[OpenAI] Persona parsing failed, using fallback persona. Error:', err.message);
    }


    return {
      persona,
      story,
      usedOpenAI: true,
      usedFallback: false
    };
  } catch (err) {
    console.error('[OpenAI] Request error:', err.message);
    return {
      persona: FALLBACK_PERSONA,
      story: FALLBACK_STORY,
      usedOpenAI: false,
      usedFallback: true
    };
  }
};
