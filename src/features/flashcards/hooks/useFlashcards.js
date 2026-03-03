import { useContext } from 'react';
import { FlashcardsContext } from '../context/FlashcardsContext.jsx';

export function useFlashcards() {
  const context = useContext(FlashcardsContext);

  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardsProvider');
  }

  return context;
}
