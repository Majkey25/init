import type { Lang } from '../i18n';

export const careerWindow = { start: 2021, end: 2027 };

const monthIndex = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year! * 12 + month! - 1;
};

export const careerRange = (start: string, end: string | null) => {
  const first = careerWindow.start * 12;
  const last = careerWindow.end * 12;
  const from = Math.max(first, Math.min(last, monthIndex(start)));
  // A named end month includes the whole month; ongoing work reaches the chart edge.
  const to = end === null ? last : Math.max(from, Math.min(last, monthIndex(end) + 1));
  return {
    start: ((from - first) / (last - first)) * 100,
    duration: ((to - from) / (last - first)) * 100,
  };
};

export const getExperience = (lang: Lang) => {
  const cs = lang === 'cs';
  const month = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const formatMonth = (date: string) => month.format(new Date(`${date}-01T00:00:00Z`));
  return [
    {
      start: '2021-09',
      end: '2025-05',
      role: cs ? 'Strojírenství' : 'Mechanical Engineering',
      org: 'Střední průmyslová škola Zlín',
      label: cs ? 'Strojírenství · SPŠ Zlín' : 'Mechanical Engineering · SPŠ Zlín',
      logo: 'school' as const,
    },
    {
      start: '2023-01',
      end: '2025-06',
      role: cs ? 'Student programování v Azure' : 'Student Azure Programming',
      org: 'Student Trainee Center (STC)',
      label: cs ? 'Programování v Azure · STC' : 'Azure Programming · STC',
      logo: 'stc' as const,
      support: true,
      note: cs
        ? 'Vybrán do IT programu podporovaného Microsoftem. Vývoj softwaru, API a cloudových projektů s mentory. Závěrečný projekt Music Analyzer: aplikace v Pythonu a Flasku využívající Librosa, Spleeter a Demucs pro rozdělení hudby na šest stop, přehrávání a ovládání jednotlivých stop.'
        : 'Selected for a Microsoft-supported IT programme, building software, API and cloud projects with mentors. Final project: Music Analyzer, a Python/Flask app using Librosa, Spleeter and Demucs for six-stem music separation, playback and per-stem controls.',
    },
    {
      start: '2025-06',
      end: null,
      role: 'Full-Stack AI/ML Engineer & Backend Developer',
      org: 'OKsystem',
      label: 'AI / Full-Stack · OKsystem',
      note: cs
        ? 'Vyvíjím LLM chatboty a RAG systémy. Pracuji s Python službami, API, databázemi a integracemi. V inovačním týmu také experimentuji s modely, jejich hodnocením a adaptací na české jazykové úlohy.'
        : 'Build LLM chatbots and RAG systems with Python services, APIs, databases and integrations. In the innovation team I also experiment with model evaluation and adaptation for Czech-language tasks.',
    },
    {
      start: '2025-09',
      end: null,
      role: cs ? 'Softwarové inženýrství' : 'Software Engineering',
      org: cs ? 'Univerzita Tomáše Bati ve Zlíně' : 'Tomas Bata University in Zlín',
      label: cs ? 'Softwarové inženýrství · UTB Zlín' : 'Software Engineering · UTB Zlín',
      logo: 'utb' as const,
      note: cs
        ? 'Kombinované studium algoritmů, návrhu softwaru, databází, AI, sítí a vývoje webových a mobilních aplikací.'
        : 'Combined study covering algorithms, software design, databases, AI, networks and web/mobile development.',
    },
    {
      start: '2026-05',
      end: '2026-10',
      role: cs ? 'Výzkumník bezpečnosti AI a red teamingu' : 'AI Safety & Red Teaming Researcher',
      org: cs ? 'Na volné noze' : 'Freelance',
      label: cs ? 'Bezpečnost AI a red teaming' : 'AI Safety & Red Teaming',
      note: cs
        ? 'Neveřejné hodnocení bezpečnosti pokročilé generativní AI pro nejmenovanou AI společnost pod NDA. Nezávislý a odpovědný výzkum zranitelností.'
        : 'Private safety evaluations of frontier generative AI for a confidential AI company under NDA. Independent, responsible vulnerability research.',
    },
  ].map((entry) => ({
    ...entry,
    when: `${formatMonth(entry.start)} – ${entry.end === null ? (cs ? 'dosud' : 'present') : formatMonth(entry.end)}`,
  }));
};
