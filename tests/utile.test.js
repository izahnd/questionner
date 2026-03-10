import * as React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { getRandomCard } from '../src/features/flashcards/utils/getRandomCard.js';
import { flashcards } from '../src/features/flashcards/data/flashcards.js';
import { FlashcardsEmptyState } from '../src/features/flashcards/components/FlashcardsEmptyState.jsx';
import { FlashcardsSession } from '../src/features/flashcards/components/FlashcardsSession.jsx';

function findByType(node, type) {
  if (!node || typeof node !== 'object') {
    return null;
  }

  if (node.type === type) {
    return node;
  }

  const children = Array.isArray(node.props?.children)
    ? node.props.children
    : [node.props?.children];

  for (const child of children) {
    const found = findByType(child, type);
    if (found) {
      return found;
    }
  }

  return null;
}

function flattenText(node) {
  if (node == null) {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (typeof node !== 'object') {
    return '';
  }

  const children = Array.isArray(node.props?.children)
    ? node.props.children
    : [node.props?.children];

  return children.map(flattenText).join(' ');
}

function findButtons(node, matches = []) {
  if (!node || typeof node !== 'object') {
    return matches;
  }

  if (node.type === 'button') {
    matches.push(node);
  }

  const children = Array.isArray(node.props?.children)
    ? node.props.children
    : [node.props?.children];

  for (const child of children) {
    findButtons(child, matches);
  }

  return matches;
}

describe('getRandomCard', () => {
  it('returns a card from array', () => {
    const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(cards).toContain(getRandomCard(cards));
  });

  it('returns the only card for single-item array', () => {
    const onlyCard = { id: 1 };
    expect(getRandomCard([onlyCard])).toBe(onlyCard);
  });

  it('returns null for empty array', () => {
    expect(getRandomCard([])).toBeNull();
  });

  it('returns null for non-array input', () => {
    expect(getRandomCard(undefined)).toBeNull();
  });
});

describe('flashcards dataset invariants', () => {
  it('contains only valid cards with non-empty question and answer', () => {
    expect(Array.isArray(flashcards)).toBe(true);
    expect(flashcards.length).toBeGreaterThan(0);

    for (const card of flashcards) {
      expect(card).toBeTruthy();
      expect(typeof card.question).toBe('string');
      expect(card.question.trim().length).toBeGreaterThan(0);
      expect(typeof card.answer).toBe('string');
      expect(card.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it('does not contain mojibake markers', () => {
    const brokenEncodingPattern = /Ã|Â|â€|�/;

    for (const card of flashcards) {
      expect(card.question).not.toMatch(brokenEncodingPattern);
      expect(card.answer).not.toMatch(brokenEncodingPattern);
    }
  });
});

describe('FlashcardsEmptyState', () => {
  it('calls onStart on click', () => {
    const onStart = vi.fn();
    const tree = FlashcardsEmptyState({ onStart });
    const button = findByType(tree, 'button');

    button.props.onClick();
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});

describe('FlashcardsSession', () => {
  it('renders card question, hides answer by default and shows total cards', () => {
    const html = renderToStaticMarkup(
      React.createElement(FlashcardsSession, {
        currentCard: { question: 'What is JS?', answer: 'A language' },
        totalCards: 10,
        onNextCard: vi.fn(),
      }),
    );

    expect(html).toContain('What is JS?');
    expect(html).not.toContain('A language');
    expect(html).toContain('Afficher la reponse');
    expect(html).toContain('10');
  });

  it('reveals answer when reveal button is clicked', async () => {
    vi.resetModules();
    const setIsAnswerVisible = vi.fn();

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useState: vi.fn(() => [false, setIsAnswerVisible]),
        useEffect: vi.fn(),
      };
    });

    const { FlashcardsSession } = await import(
      '../src/features/flashcards/components/FlashcardsSession.jsx'
    );
    const tree = FlashcardsSession({
      currentCard: { question: 'What is JS?', answer: 'A language' },
      totalCards: 10,
      onNextCard: vi.fn(),
    });
    const revealButton = findButtons(tree).find((button) =>
      flattenText(button).includes('Afficher la reponse'),
    );

    revealButton.props.onClick();
    expect(setIsAnswerVisible).toHaveBeenCalledWith(true);
  });

  it('calls onNextCard from button click', async () => {
    vi.resetModules();
    const setIsAnswerVisible = vi.fn();

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useState: vi.fn(() => [false, setIsAnswerVisible]),
        useEffect: vi.fn(),
      };
    });

    const { FlashcardsSession } = await import(
      '../src/features/flashcards/components/FlashcardsSession.jsx'
    );
    const onNextCard = vi.fn();
    const tree = FlashcardsSession({
      currentCard: { question: 'Q', answer: 'A' },
      totalCards: 1,
      onNextCard,
    });
    const button = findButtons(tree).find((candidate) =>
      flattenText(candidate).includes('Next Card'),
    );

    button.props.onClick();
    expect(onNextCard).toHaveBeenCalledTimes(1);
  });
});

describe('useFlashcards', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('throws outside provider', async () => {
    const useContextMock = vi.fn(() => null);

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return { ...actual, useContext: useContextMock };
    });

    const { useFlashcards } = await import(
      '../src/features/flashcards/hooks/useFlashcards.js'
    );

    expect(() => useFlashcards()).toThrow(
      'useFlashcards must be used within FlashcardsProvider',
    );
  });

  it('returns context value inside provider', async () => {
    const contextValue = { hasStarted: true };
    const useContextMock = vi.fn(() => contextValue);

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return { ...actual, useContext: useContextMock };
    });

    const { useFlashcards } = await import(
      '../src/features/flashcards/hooks/useFlashcards.js'
    );

    expect(useFlashcards()).toBe(contextValue);
  });
});

describe('FlashcardsProvider', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('provides state and actions', async () => {
    const setCurrentCard = vi.fn();
    const setHasStarted = vi.fn();
    const sampleCards = [{ question: 'Q1', answer: 'A1' }, { question: 'Q2', answer: 'A2' }];
    const randomCard = { question: 'Random', answer: 'Answer' };

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useState: vi.fn((initialValue) => {
          if (initialValue === null) {
            return [null, setCurrentCard];
          }

          if (initialValue === false) {
            return [false, setHasStarted];
          }

          return [initialValue, vi.fn()];
        }),
      };
    });
    vi.doMock('../src/features/flashcards/data/flashcards.js', () => ({
      flashcards: sampleCards,
    }));
    vi.doMock('../src/features/flashcards/utils/getRandomCard.js', () => ({
      getRandomCard: vi.fn(() => randomCard),
    }));

    const { FlashcardsProvider } = await import(
      '../src/features/flashcards/context/FlashcardsContext.jsx'
    );
    const { getRandomCard } = await import(
      '../src/features/flashcards/utils/getRandomCard.js'
    );

    const tree = FlashcardsProvider({ children: 'child' });
    const value = tree.props.value;

    expect(value.totalCards).toBe(sampleCards.length);
    expect(value.currentCard).toBeNull();
    expect(value.hasStarted).toBe(false);

    value.startQuestionner();
    expect(getRandomCard).toHaveBeenCalledWith(sampleCards);
    expect(setCurrentCard).toHaveBeenCalledWith(randomCard);
    expect(setHasStarted).toHaveBeenCalledWith(true);

    value.showNextCard();
    expect(getRandomCard).toHaveBeenCalledWith(sampleCards);
    expect(setCurrentCard).toHaveBeenCalledWith(randomCard);
  });

  it('handles empty cards without starting session', async () => {
    const setCurrentCard = vi.fn();
    const setHasStarted = vi.fn();

    vi.doMock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useState: vi.fn((initialValue) => {
          if (initialValue === null) {
            return [null, setCurrentCard];
          }

          if (initialValue === false) {
            return [false, setHasStarted];
          }

          return [initialValue, vi.fn()];
        }),
      };
    });
    vi.doMock('../src/features/flashcards/data/flashcards.js', () => ({
      flashcards: [],
    }));
    vi.doMock('../src/features/flashcards/utils/getRandomCard.js', () => ({
      getRandomCard: vi.fn(),
    }));

    const { FlashcardsProvider } = await import(
      '../src/features/flashcards/context/FlashcardsContext.jsx'
    );
    const tree = FlashcardsProvider({ children: 'child' });
    const value = tree.props.value;

    value.startQuestionner();
    expect(setCurrentCard).toHaveBeenCalledWith(null);
    expect(setHasStarted).toHaveBeenCalledWith(false);

    value.showNextCard();
    expect(setCurrentCard).toHaveBeenCalledWith(null);
  });
});

describe('FlashcardsView', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders empty state before start', async () => {
    const startQuestionner = vi.fn();
    const showNextCard = vi.fn();

    vi.doMock('../src/features/flashcards/hooks/useFlashcards.js', () => ({
      useFlashcards: vi.fn(() => ({
        currentCard: null,
        hasStarted: false,
        totalCards: 2,
        startQuestionner,
        showNextCard,
      })),
    }));

    const { FlashcardsView } = await import(
      '../src/features/flashcards/components/FlashcardsView.jsx'
    );
    const { FlashcardsEmptyState } = await import(
      '../src/features/flashcards/components/FlashcardsEmptyState.jsx'
    );
    const tree = FlashcardsView();
    const child = tree.props.children;

    expect(child.type).toBe(FlashcardsEmptyState);
    expect(child.props.onStart).toBe(startQuestionner);
  });

  it('renders session after start', async () => {
    const startQuestionner = vi.fn();
    const showNextCard = vi.fn();

    vi.doMock('../src/features/flashcards/hooks/useFlashcards.js', () => ({
      useFlashcards: vi.fn(() => ({
        currentCard: { question: 'Q', answer: 'A' },
        hasStarted: true,
        totalCards: 7,
        startQuestionner,
        showNextCard,
      })),
    }));

    const { FlashcardsView } = await import(
      '../src/features/flashcards/components/FlashcardsView.jsx'
    );
    const { FlashcardsSession } = await import(
      '../src/features/flashcards/components/FlashcardsSession.jsx'
    );
    const tree = FlashcardsView();
    const child = tree.props.children;

    expect(child.type).toBe(FlashcardsSession);
    expect(child.props.totalCards).toBe(7);
    expect(child.props.onNextCard).toBe(showNextCard);
  });
});
