export function getRandomCard(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
