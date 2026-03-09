/**
 * Component affiché lorsque la liste de cartes est vide. 
 * @param {*} param0 
 * 
 */
export function FlashcardsEmptyState({ onStart }) {
 
  return (
    <div className="flex flex-col items-start gap-5">
      <p className="max-w-xl text-base leading-7 text-stone-300">
        Lance une session pour afficher une carte choisie au hasard depuis le
        contexte global.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-amber-200"
      >
        Start Questionner
      </button>
    </div>
  );
}
