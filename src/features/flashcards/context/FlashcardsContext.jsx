import { createContext, useState } from 'react';
import { flashcards } from '../data/flashcards.js';
import { getRandomCard } from '../utils/getRandomCard.js';

export const FlashcardsContext = createContext(null);

export function FlashcardsProvider({ children }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const safeCards = flashcards.filter(
    (card) =>
      card &&
      typeof card.question === 'string' &&
      card.question.trim() !== '' &&
      typeof card.answer === 'string' &&
      card.answer.trim() !== '',
  );

  const startQuestionner = () => {
    if (safeCards.length === 0) {
      setCurrentCard(null);
      setHasStarted(false);
      return;
    }

    setCurrentCard(getRandomCard(safeCards));
    setHasStarted(true);
  };

  const showNextCard = () => {
    if (safeCards.length === 0) {
      setCurrentCard(null);
      return;
    }

    setCurrentCard(getRandomCard(safeCards));
  };

  const value = {
    currentCard,
    hasStarted,
    totalCards: safeCards.length,
    startQuestionner,
    showNextCard,
  };

  return (
    <FlashcardsContext.Provider value={value}>
      {children}
    </FlashcardsContext.Provider>
  );
}
