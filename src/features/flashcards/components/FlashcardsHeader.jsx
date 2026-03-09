/**
 *  Component affiché en haut de la page des flashcards, présentant le titre et une description de l'application.
 * @returns JSX.Element 
 */
export function FlashcardsHeader() {
   return (
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
  );
}
