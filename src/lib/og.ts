// Link preview card (Open Graph image), rendered at build time.
// 1200×630 PNG, the size LinkedIn, email clients, and others expect.
// Same type and colors as the site, light theme.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = process.cwd();
const woff = (pkg: string, file: string) => readFileSync(join(root, 'node_modules/@fontsource', pkg, 'files', file));

const INK = '#1D232B';
const QUIET = '#59626E';
const RULE = '#DDE2E7';

export interface Card {
  name: string;
  headline: string;
  lead: string;   // one sentence, set as the body of the card
  footer: string; // the site's address
}

export async function renderCard({ name, headline, lead, footer }: Card): Promise<Uint8Array> {
  const leadSize = lead.length > 150 ? 36 : lead.length > 100 ? 40 : 46;
  const node = {
    type: 'div',
    props: {
      style: { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: '#FFFFFF', padding: '72px 88px 60px', color: INK },
      children: [
        { type: 'div', props: { style: { fontFamily: 'Source Serif', fontWeight: 600, fontSize: 76, letterSpacing: -1.5, lineHeight: 1.05 }, children: name } },
        { type: 'div', props: { style: { fontFamily: 'Public Sans', fontSize: 30, color: QUIET, marginTop: 14 }, children: headline } },
        { type: 'div', props: { style: { display: 'flex', flex: 1, alignItems: 'center' }, children: [
          { type: 'div', props: { style: { fontFamily: 'Source Serif', fontWeight: 400, fontSize: leadSize, lineHeight: 1.32, maxWidth: 960 }, children: lead } },
        ] } },
        { type: 'div', props: { style: { display: 'flex', borderTop: `2px solid ${RULE}`, paddingTop: 24, fontFamily: 'Public Sans', fontWeight: 600, fontSize: 26, color: QUIET }, children: footer } },
      ],
    },
  };
  const svg = await satori(node as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Source Serif', data: woff('source-serif-4', 'source-serif-4-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'Source Serif', data: woff('source-serif-4', 'source-serif-4-latin-600-normal.woff'), weight: 600, style: 'normal' },
      { name: 'Public Sans', data: woff('public-sans', 'public-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'Public Sans', data: woff('public-sans', 'public-sans-latin-600-normal.woff'), weight: 600, style: 'normal' },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
