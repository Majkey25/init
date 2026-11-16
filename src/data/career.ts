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
      label: cs ? 'Strojírenství · SPŠ Zlín' : 'Mechanical Engineering · SPŠ Zlín',
      logo: 'school' as const,
    },
    {
      start: '2022-11',
      end: '2025-02',
      label: cs ? 'Programování v Azure · STC' : 'Azure Programming · STC',
      logo: 'stc' as const,
      support: true,
    },
    {
      start: '2025-06',
      end: null,
      label: 'AI / Full-Stack · OKsystem',
      logo: 'oksystem' as const,
    },
    {
      start: '2025-09',
      end: null,
      label: cs ? 'Softwarové inženýrství · UTB Zlín' : 'Software Engineering · UTB Zlín',
      logo: 'utb' as const,
    },
    {
      start: '2026-05',
      end: '2026-10',
      label: cs ? 'Bezpečnost AI a red teaming' : 'AI Safety & Red Teaming',
    },
  ].map((entry) => ({
    ...entry,
    when: `${formatMonth(entry.start)} – ${entry.end === null ? (cs ? 'dosud' : 'present') : formatMonth(entry.end)}`,
  }));
};
