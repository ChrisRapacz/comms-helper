import { MessageVariantConfig } from './types';

export const MESSAGE_VARIANTS: MessageVariantConfig[] = [
  {
    id: 'base',
    name: 'Bazowa wersja',
    description: 'Standardowy format - wyważona długość i ton',
    icon: '📄',
  },
  {
    id: 'subsections',
    name: 'Z podsekcjami',
    description: 'Podzielona na wyraźne sekcje z nagłówkami',
    icon: '📑',
  },
  {
    id: 'detailed',
    name: 'Szczegółowa',
    description: 'Rozbudowana wersja z pełnym kontekstem i dodatkowymi informacjami',
    icon: '📖',
  },
  {
    id: 'short',
    name: 'Skrócona',
    description: 'Zwięzła wersja - tylko najważniejsze punkty',
    icon: '✂️',
  },
  {
    id: 'bullets',
    name: 'Bullet Points',
    description: 'W formie wypunktowanych punktów',
    icon: '•',
  },
  {
    id: 'tldr-first',
    name: 'TL;DR First',
    description: 'Kluczowe podsumowanie na górze, szczegóły poniżej',
    icon: '⚡',
  },
  {
    id: 'action-oriented',
    name: 'Action-Oriented',
    description: 'Skupiona na konkretnych krokach i działaniach do wykonania',
    icon: '🎯',
  },
  {
    id: 'faq',
    name: 'FAQ Format',
    description: 'W formie pytań i odpowiedzi',
    icon: '❓',
  },
  {
    id: 'visual',
    name: 'Visual/Emoji',
    description: 'Z emoji i wizualną strukturą',
    icon: '🎨',
  },
  {
    id: 'formal',
    name: 'Formalny',
    description: 'Bardzo profesjonalny, korporacyjny ton',
    icon: '🎩',
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Przyjazny, konwersacyjny ton',
    icon: '😊',
  },
  {
    id: 'data-driven',
    name: 'Data-Driven',
    description: 'Skupiony na liczbach, faktach i konkretach',
    icon: '📊',
  },
  {
    id: 'english',
    name: 'English',
    description: 'Translated to English for English-speaking employees',
    icon: '🇬🇧',
  },
  {
    id: 'staropolski',
    name: 'Staropolski',
    description: 'W imitacji staropolszczyzny, zaczynający się od "Mocium Panie,"',
    icon: '📜',
  },
];

export function getVariantConfig(variantId: string): MessageVariantConfig | undefined {
  return MESSAGE_VARIANTS.find(v => v.id === variantId);
}
