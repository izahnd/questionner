import { useFlashcards } from '../hooks/useFlashcards.js';
import { FlashcardsEmptyState } from './FlashcardsEmptyState.jsx';
import { FlashcardsSession } from './FlashcardsSession.jsx';




export function FlashcardsView() {
  const { currentCard, hasStarted, totalCards, startQuestionner, showNextCard } =
    useFlashcards();

  return (
    <section className="rounded-[2rem] border border-stone-800 bg-stone-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
      {hasStarted && currentCard ? (
        <FlashcardsSession
          currentCard={currentCard}
          totalCards={totalCards}
          onNextCard={showNextCard}
        />
      ) : (
        <FlashcardsEmptyState onStart={startQuestionner} />
      )}
    </section>
  );
}
