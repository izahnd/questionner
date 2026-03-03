export function getRandomCard(cards) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
