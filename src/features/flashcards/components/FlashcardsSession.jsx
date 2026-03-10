import { useEffect, useState } from 'react';

export function FlashcardsSession({ currentCard, totalCards, onNextCard }) {
  /**
   * Affiche une session de flashcards avec la carte actuelle, le nombre total de cartes et un
   *  bouton pour passer à la carte suivante.
   */
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  useEffect(() => {
    setIsAnswerVisible(false);
  }, [currentCard]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-amber-400/40 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
          Carte aleatoire
        </span>
        <span className="text-sm text-stone-400">{totalCards} cartes</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-stone-800 bg-stone-950 p-5">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">
            Question
          </p>
          <p className="text-2xl font-semibold text-stone-50">
            {currentCard.question}
          </p>
        </article>

        <article className="rounded-3xl border border-stone-800 bg-stone-950 p-5">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">
            Reponse
          </p>
          {isAnswerVisible ? (
            <p className="text-lg leading-8 text-stone-200">
              {currentCard.answer}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setIsAnswerVisible(true)}
              className="inline-flex items-center justify-center rounded-full border border-amber-300/40 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:border-amber-200 hover:text-amber-100"
            >
              Afficher la reponse
            </button>
          )}
        </article>
      </div>

      <button
        type="button"
        onClick={onNextCard}
        className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-amber-200 md:w-auto"
      >
        Next Card
      </button>
    </div>
  );
}
