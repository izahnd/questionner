import React from 'react';
import { useFlashcards } from './state/FlashcardsContext.jsx';

export function App() {
  const { currentCard, hasStarted, totalCards, startQuestionner, showNextCard } =
    useFlashcards();

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-10 text-stone-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
            Flashcards
          </p>
          <h1 className="text-4xl font-black text-stone-50 md:text-6xl">
            Questionner
          </h1>
          <p className="max-w-2xl text-base text-stone-300 md:text-lg">
            L&apos;application utilise maintenant React Context API pour gerer
            l&apos;etat des cartes et la navigation.
          </p>
        </header>

        <section className="rounded-[2rem] border border-stone-800 bg-stone-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          {hasStarted && currentCard ? (
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
                  <p className="text-lg leading-8 text-stone-200">
                    {currentCard.answer}
                  </p>
                </article>
              </div>

              <button
                type="button"
                onClick={showNextCard}
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-amber-200 md:w-auto"
              >
                Next Card
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5">
              <p className="max-w-xl text-base leading-7 text-stone-300">
                Lance une session pour afficher une carte choisie au hasard
                depuis le contexte global.
              </p>
              <button
                type="button"
                onClick={startQuestionner}
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-amber-200"
              >
                Start Questionner
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
