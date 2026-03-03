import { createContext, useState } from 'react';
import { flashcards } from '../data/flashcards.js';
import { getRandomCard } from '../utils/getRandomCard.js';

export const FlashcardsContext = createContext(null);

export function FlashcardsProvider({ children }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startQuestionner = () => {
    setCurrentCard(getRandomCard(flashcards));
    setHasStarted(true);
  };

  const showNextCard = () => {
    setCurrentCard(getRandomCard(flashcards));
  };

  const value = {
    currentCard,
    hasStarted,
    totalCards: flashcards.length,
    startQuestionner,
    showNextCard,
  };

  return (
    <FlashcardsContext.Provider value={value}>
      {children}
    </FlashcardsContext.Provider>
  );
}
