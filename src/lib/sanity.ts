import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Minimal portable text → HTML (handles paragraphs, headings, bold, italic, links)
export function portableTextToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block") return "";

      const children = (block.children ?? [])
        .map((span: any) => {
          let text = span.text ?? "";
          const marks: string[] = span.marks ?? [];

          // Apply inline marks (order matters: inner → outer)
          if (marks.includes("code")) text = `<code>${text}</code>`;
          if (marks.includes("strong")) text = `<strong>${text}</strong>`;
          if (marks.includes("em")) text = `<em>${text}</em>`;
          if (marks.includes("underline")) text = `<u>${text}</u>`;
          if (marks.includes("strike-through")) text = `<s>${text}</s>`;

          // Resolve annotation marks (links etc.) from markDefs
          const linkMark = marks.find((m) =>
            (block.markDefs ?? []).some(
              (d: any) => d._key === m && d._type === "link",
            ),
          );
          if (linkMark) {
            const def = block.markDefs.find((d: any) => d._key === linkMark);
            text = `<a href="${def.href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
          }

          return text;
        })
        .join("");

      switch (block.style) {
        case "h1":
          return `<h1>${children}</h1>`;
        case "h2":
          return `<h2>${children}</h2>`;
        case "h3":
          return `<h3>${children}</h3>`;
        case "h4":
          return `<h4>${children}</h4>`;
        case "blockquote":
          return `<blockquote>${children}</blockquote>`;
        default:
          return `<p>${children}</p>`;
      }
    })
    .join("\n");
}

// ─── GROQ queries ────────────────────────────────────────────────────────────

export interface Track {
  _key: string;
  title: string;
  desc?: any[];
  spotifyUrl?: string;
  deezerUrl?: string;
  appleUrl?: string;
  coverArt?: any;
}

export interface Video {
  _key: string;
  title: string;
  url: string;
}

export interface ReviewVideo {
  _key: string;
  title: string;
  desc?: string;
  url: string;
}

export interface PressQuote {
  _key: string;
  quote: string;
  source: string;
}

export interface Contact {
  bookingEmail?: string;
  pressEmail?: string;
  website?: string;
  instagram?: string;
  spotify?: string;
  deezer?: string;
  tiktok?: string;
  facebook?: string;
  appleMusic?: string;
}

export interface EPK {
  bandName: string;
  tagline?: string;
  genres?: string[];
  heroImage?: any;
  biography?: any[];
  onlinePresence?: any[];
  reviews?: any[];
  live?: any[];
  tracks?: Track[];
  photos?: any[];
  videos?: Video[];
  reviewVideos?: ReviewVideo[];
  pressQuotes?: PressQuote[];
  contact?: Contact;
}

export async function getEpk(): Promise<EPK | null> {
  return client.fetch<EPK | null>(`
    *[_type == "epk"][0]{
      bandName,
      tagline,
      genres,
      heroImage,
      biography,
      onlinePresence,
      itws,
      live,
      reviews,
      tracks[]{
        _key,
        title,
        desc,
        spotifyUrl,
        deezerUrl,
        appleUrl,
        coverArt
      },
      photos[]{
        _key,
        asset->,
        alt,
        caption
      },
      videos[]{
        _key,
        title,
        url
      },
      reviewVideos[]{
        _key,
        title,
        desc,
        url
      },
      pressQuotes[]{
        _key,
        quote,
        source
      },
      contact
    }
  `);
}
