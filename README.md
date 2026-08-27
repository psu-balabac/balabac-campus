# PalSU Balabac Campus Blog

A static GitHub Pages campus website/blog prepared for Palawan State University – Balabac Campus.

## What is included

- Responsive campus homepage
- Featured news story
- Searchable/filterable news feed
- Individual article pages
- Announcements panel
- Academic programs section
- About section
- Mobile navigation
- GitHub Pages compatible (no server required)

## Publish it on GitHub Pages

1. Open your `balabac-campus` repository.
2. Click **Add file → Upload files**.
3. Upload all files and folders from this package.
4. Commit the files.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select **main** and **/(root)**.
8. Save.
9. Wait a minute or two, then GitHub will show your site URL.

## Add a new campus story

Open:

`js/posts.js`

Find:

`const POSTS = [`

Copy an existing post object and edit these fields:

- `id` — short unique URL-friendly name, e.g. `buwan-ng-wika-2026`
- `title`
- `date` — format `YYYY-MM-DD`
- `category`
- `author`
- `featured` — use `true` for only one current featured story
- `deck`
- `excerpt`
- `label`
- `content` — article body in HTML

Example:

```js
{
  id: "buwan-ng-wika-2026",
  title: "Balabac Campus Celebrates Buwan ng Wika 2026",
  date: "2026-08-28",
  category: "Campus Events",
  author: "PalSU Balabac Campus",
  featured: true,
  deck: "Students celebrate Filipino language, culture, literature, and the arts.",
  excerpt: "A whole-day celebration brought together students through literary, cultural, and artistic competitions.",
  label: "Buwan ng Wika",
  content: `
    <p>Write your first paragraph here.</p>
    <h2>Section heading</h2>
    <p>Continue the article here.</p>
  `
}
```

The homepage and article page will update automatically.

## Add announcements

Still inside `js/posts.js`, edit the `ANNOUNCEMENTS` array.

## Logo and photos

The starter uses a temporary PSU text emblem and graphic gradients so it works immediately without missing image files.

You may later replace the `.brand-mark` element with the university/campus logo and replace story gradients with your own campus photos.

## Recommended next improvement

For a more Blogger/WordPress-like editing experience, add a Git-based CMS later (for example Decap CMS). The current version intentionally keeps publishing simple and dependency-free.
