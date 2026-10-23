import type { APIRoute } from 'astro';
import { getProfile } from '../../lib/content';
import { renderCard } from '../../lib/og';

// The home page's link preview card, built from the profile.
export const GET: APIRoute = async ({ site }) => {
  const profile = await getProfile();
  const [lead] = profile.summary.split(/(?<=\.)\s+/);
  const png = await renderCard({
    name: profile.name,
    headline: profile.headline,
    lead,
    footer: new URL(site!).host,
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
