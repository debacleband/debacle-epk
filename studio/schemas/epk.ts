import { defineField, defineType } from "sanity";

export default defineType({
  name: "epk",
  title: "Electronic Press Kit",
  type: "document",
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    defineField({
      name: "bandName",
      title: "Band / Artist Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short punchy line shown below the band name on the EPK.",
    }),
    defineField({
      name: "genres",
      title: "Genres",
      type: "array",
      of: [{ type: "string" }],
      description: "Add as many genres as you like with the + button.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-width banner image at the top of the EPK.",
    }),

    // ── Biography ─────────────────────────────────────────────────────────
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),

    // ── Music tracks ──────────────────────────────────────────────────────
    defineField({
      name: "tracks",
      title: "Music Tracks",
      type: "array",
      of: [
        {
          type: "object",
          name: "track",
          title: "Track",
          fields: [
            defineField({
              name: "title",
              title: "Track Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "desc",
              title: "Track Description",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                },
              ],
            }),
            defineField({
              name: "spotifyUrl",
              title: "Spotify URL",
              type: "url",
              description: "e.g. https://open.spotify.com/track/…",
            }),
            defineField({
              name: "deezerUrl",
              title: "Deezer URL",
              type: "url",
              description: "e.g. https://www.deezer.com/track/…",
            }),
            defineField({
              name: "appleUrl",
              title: "Apple Music URL",
              type: "url",
              description: "e.g. https://music.apple.com/track/…",
            }),
            defineField({
              name: "coverArt",
              title: "Cover Art",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", media: "coverArt" },
          },
        },
      ],
    }),

    // ── Online ─────────────────────────────────────────────────────

    defineField({
      name: "onlinePresence",
      title: "En ligne",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),

    // ── Press Reviews ─────────────────────────────────────────────────────────
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "reviewVideos",
      title: "Review Videos",
      type: "array",
      of: [
        {
          type: "object",
          name: "reviewVideo",
          title: "Review Video",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "itws",
      title: "Interviews",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),

    // ── Live ─────────────────────────────────────────────────────

    defineField({
      name: "live",
      title: "Live",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
    }),

    // ── Photo gallery ─────────────────────────────────────────────────────
    defineField({
      name: "photos",
      title: "Photo Gallery",
      description: "These photos appear in the carousel on the EPK.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ── Videos ────────────────────────────────────────────────────────────
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        },
      ],
    }),

    // ── Press quotes ──────────────────────────────────────────────────────
    defineField({
      name: "pressQuotes",
      title: "Press Quotes",
      type: "array",
      of: [
        {
          type: "object",
          name: "pressQuote",
          title: "Press Quote",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
            defineField({
              name: "source",
              title: "Source",
              type: "string",
              description: 'e.g. "Rolling Stone", "Pitchfork"',
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "source", subtitle: "quote" } },
        },
      ],
    }),

    // ── Contact ───────────────────────────────────────────────────────────
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "bookingEmail",
          title: "Booking Email",
          type: "string",
        }),
        defineField({
          name: "pressEmail",
          title: "Press Email",
          type: "string",
        }),
        defineField({ name: "website", title: "Website", type: "url" }),
        defineField({
          name: "instagram",
          title: "Instagram Profile URL",
          type: "url",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok Profile URL",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook Profile URL",
          type: "url",
        }),
        defineField({
          name: "spotify",
          title: "Spotify Artist URL",
          type: "url",
        }),
        defineField({
          name: "deezer",
          title: "Deezer Artist URL",
          type: "url",
        }),
        defineField({
          name: "appleMusic",
          title: "Apple Music Artist URL",
          type: "url",
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "bandName", subtitle: "tagline", media: "heroImage" },
  },
});
