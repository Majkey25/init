import type { CollectionEntry } from 'astro:content';
import { groups } from './site';

export const languages = ['en', 'cs'] as const;
export type Lang = (typeof languages)[number];

export const ui = {
  en: {
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    main: 'Main',
    language: 'Language',
    theme: 'Dark theme',
    skip: 'Skip to content',
    privacy: 'Privacy',
    source: 'source',
    typography: 'set in Mona Sans and Geist Mono · built with Astro',
    problem: 'problem',
    title: 'Matěj Teplý: applied AI, strategy and training',
    description:
      'Matěj Teplý builds AI and software products, helps organizations plan and integrate AI, and teaches employees to use AI tools effectively and safely.',
    allProjects: 'All projects',
    groups: 'Groups',
    caseStudy: 'case study',
    formerly: 'formerly',
    privateSource: 'source private',
    area: 'area',
    stack: 'stack',
    asOf: 'as of',
    story: ['Problem', 'Approach', 'Result'],
    example: 'example',
    links: 'Links',
    nextProject: 'Next project',
    next: 'next',
    mail: 'Mail me',
    copy: 'Copy email',
    copied: 'Email copied',
    copyError: 'Copy blocked. Use Mail me.',
  },
  cs: {
    work: 'Projekty',
    about: 'O mně',
    contact: 'Kontakt',
    main: 'Hlavní navigace',
    language: 'Jazyk',
    theme: 'Tmavý režim',
    skip: 'Přejít na obsah',
    privacy: 'Soukromí',
    source: 'zdrojový kód',
    typography: 'písma Mona Sans a Geist Mono · vytvořeno v Astro',
    problem: 'problém',
    title: 'Matěj Teplý: aplikovaná AI, strategie a školení',
    description:
      'Matěj Teplý vyvíjí AI a software, pomáhá firmám plánovat a zavádět AI a učí zaměstnance používat AI nástroje efektivně a bezpečně.',
    allProjects: 'Všechny projekty',
    groups: 'Kategorie',
    caseStudy: 'případová studie',
    formerly: 'dříve',
    privateSource: 'neveřejný zdrojový kód',
    area: 'oblast',
    stack: 'technologie',
    asOf: 'stav k',
    story: ['Problém', 'Postup', 'Výsledek'],
    example: 'příklad',
    links: 'Odkazy',
    nextProject: 'Další projekt',
    next: 'další',
    mail: 'Napsat e-mail',
    copy: 'Kopírovat e-mail',
    copied: 'E-mail zkopírován',
    copyError: 'Kopírování je blokováno. Použijte odkaz.',
  },
};

export const groupLabels = {
  en: groups,
  cs: {
    ai: 'AI a jazyk',
    tools: 'Vývojářské nástroje',
    web: 'Web',
    android: 'Android',
    extensions: 'Rozšíření prohlížeče',
    earlier: 'Starší a malé nástroje',
  },
};

const linkLabels: Record<string, string> = {
  Repository: 'Repozitář',
  'Live app': 'Otevřít aplikaci',
  Showcase: 'Prezentace',
  'Open the lab': 'Otevřít laboratoř',
  Website: 'Web',
  Open: 'Otevřít',
  'Project page': 'Stránka projektu',
  'Replay report': 'Zpráva z vyhodnocení',
};

export const projectText = (project: CollectionEntry<'projects'>['data'], lang: Lang) => ({
  ...project,
  ...(lang === 'cs' ? project.cs : {}),
  links: project.links.map((link) => ({
    ...link,
    label: lang === 'cs' ? (linkLabels[link.label] ?? link.label) : link.label,
  })),
});
