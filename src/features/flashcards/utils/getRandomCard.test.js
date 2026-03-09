import { describe, expect, it } from 'vitest';
import { getRandomCard } from './getRandomCard';

describe('getRandomCard', () => {
  it('returns a card from the provided array', () => {
    const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const result = getRandomCard(cards);

    expect(cards).toContain(result);
  });

  it('returns the only item when array contains one card', () => {
    const onlyCard = { id: 1 };

    expect(getRandomCard([onlyCard])).toBe(onlyCard);
  });
});
