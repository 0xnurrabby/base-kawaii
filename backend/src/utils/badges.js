export const deriveSimpleBadges = (stats) => {
  const badges = [];

  const {
    totalTransactions = 0,
    smartContractCalls = 0,
    uniqueContracts = 0,
    totalGasFeeNative = 0,
    tokenTransferCount = 0
  } = stats || {};

  if (totalTransactions === 0) {
    badges.push({
      id: 'newbie',
      name: 'Fresh Wallet',
      description: 'Brand new pastel wallet, not much activity yet~',
      tone: 'soft'
    });
  }

  if (totalTransactions > 50) {
    badges.push({
      id: 'busy-bean',
      name: 'Busy Bean',
      description: 'This wallet is a bustling little bean of activity.',
      tone: 'cute'
    });
  }

  if (smartContractCalls > 100) {
    badges.push({
      id: 'contract-explorer',
      name: 'Contract Explorer',
      description: 'Always poking adorable smart contracts.',
      tone: 'curious'
    });
  }

  if (uniqueContracts > 20) {
    badges.push({
      id: 'onchain-butterfly',
      name: 'On-Chain Butterfly',
      description: 'Flutters between many different contracts.',
      tone: 'playful'
    });
  }

  if (totalGasFeeNative > 0.5) {
    badges.push({
      id: 'gas-guzzler',
      name: 'Gas Guzzler',
      description: 'Has spent a noticeable chunk of gas. Ouch, but cute.',
      tone: 'spicy'
    });
  } else if (totalGasFeeNative > 0 && totalGasFeeNative <= 0.2) {
    badges.push({
      id: 'gas-sipper',
      name: 'Gas Sipper',
      description: 'Sips gas carefully, like a cozy cup of tea.',
      tone: 'gentle'
    });
  }

  if (tokenTransferCount > 200) {
    badges.push({
      id: 'token-juggler',
      name: 'Token Juggler',
      description: 'Loves tossing tokens around in pastel arcs.',
      tone: 'fun'
    });
  }

  if (badges.length === 0) {
    badges.push({
      id: 'mystery-wallet',
      name: 'Mystery Wallet',
      description: 'Quiet on the outside, but who knows what stories lie within?',
      tone: 'mysterious'
    });
  }

  return badges;
};
