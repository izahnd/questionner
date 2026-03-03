import React, { createContext, useContext, useState } from 'react';
import { flashcards } from '../flashcards.js';

const FlashcardsContext = createContext(null);

function getRandomCard(cards) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

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

export function useFlashcards() {
  const context = useContext(FlashcardsContext);

  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardsProvider');
  }

  return context;
}
