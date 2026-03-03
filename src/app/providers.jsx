import { FlashcardsProvider } from '../features/flashcards/context/FlashcardsContext.jsx';

export function AppProviders({ children }) {
  return <FlashcardsProvider>{children}</FlashcardsProvider>;
}
