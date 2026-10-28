import { getCollection } from 'astro:content';

/** Projects that get their own page: pinned ones in order, then other full case studies. */
export const getCases = async () => {
  const projects = (await getCollection('projects')).map((e) => e.data);
  const pinned = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured?.order ?? 0) - (b.featured?.order ?? 0));
  return [...pinned, ...projects.filter((p) => !p.featured && p.problem && p.approach && p.result)];
};
