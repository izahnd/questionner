import { AppShell } from '../components/layout/AppShell.jsx';
import { FlashcardsHeader } from '../features/flashcards/components/FlashcardsHeader.jsx';
import { FlashcardsView } from '../features/flashcards/components/FlashcardsView.jsx';
/**
 *  Page d'accueil de l'application, affichant le header et la vue des flashcards.
 * @returns JSX.Element
 */
export function HomePage() {
  return (
    <AppShell>
      <FlashcardsHeader />
      <FlashcardsView />
    </AppShell>
  );
}
