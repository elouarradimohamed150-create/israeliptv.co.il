# israeliptv.co.il

Next.js site for Israel IPTV. Ordering is done over WhatsApp; there is no checkout.

## Where things live

| What | File |
|---|---|
| Brand name, WhatsApp number, prices per plan/devices | `lib/site.ts` |
| FAQ (also used for Google FAQ structured data) | `lib/faq.ts` |
| WhatsApp order messages | `lib/whatsapp.ts` |
| Blog posts (one JSON file per post) | `content/posts/` |
| Blog images | `public/blog-media/` |
| Redirects from the old WordPress URLs | `next.config.mjs` |

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run import-wp  # re-import posts from the old WordPress site (only while it is still online)
```

## Adding a blog post

Copy any file in `content/posts/`, give it a new `id` (file name), `slug`, `title`, `date`,
`content` (HTML) and optional `featuredImage`, `seoTitle`, `seoDescription`. Put images in
`public/blog-media/`. The post appears at `/<slug>` and in the sitemap after the next deploy.
