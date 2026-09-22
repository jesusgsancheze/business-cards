# Digital Business Cards

Interactive "backstage pass" business cards. Each card tilts with the mouse or phone, has a holographic foil effect, and flips to show contact buttons, a QR code that saves the contact, and a **Save contact** (.vcf) button.

No build step and no dependencies to install. It's plain HTML, CSS and JavaScript, so it runs on GitHub Pages as-is.

## Project structure

```
index.html        Page markup (you rarely need to touch this)
css/card.css      All styles
js/cards.js       ← The people. Edit this file to add or change cards
js/card.js        Renderer: tilt, flip, QR, copy buttons
assets/           Photos, logos and backgrounds
```

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `business-cards`).
2. Upload the contents of this folder, either by dragging the files into **Add file → Upload files** or with git:
   ```bash
   git init
   git add .
   git commit -m "Digital business cards"
   git branch -M main
   git remote add origin https://github.com/<your-user>/business-cards.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-user>.github.io/business-cards/`.

## Link to a specific person

Each card has a key in `js/cards.js`. Open it with either:

```
https://<your-user>.github.io/business-cards/?c=alejandro-castillo
https://<your-user>.github.io/business-cards/#alejandro-castillo
```

With no key, the first card opens. When there is more than one card, a picker appears under the card.

## Add a new person

Copy the `"alejandro-castillo": { … }` block in `js/cards.js`, give it a new key and edit the values:

| Field | What it does |
|---|---|
| `person.name`, `person.title` | Name and job title |
| `person.photo` | Path to a photo, e.g. `assets/maria-lopez/photo.jpg`. Leave empty to show initials |
| `person.initials` | Initials shown when there's no photo (optional) |
| `company.name`, `company.tagline` | Company name and one-line tagline |
| `company.short` | Short name shown on the hologram seal and on the back |
| `company.logo` | Path to a logo image (optional; replaces `short` on the back) |
| `pass.label`, `pass.role`, `pass.number`, `pass.season` | The text on the pass: "ALL ACCESS", access level, pass number, season |
| `services` | List of chips on the front (4–6 works best) |
| `specs` | Up to 3 `{ k, v }` pairs on the back |
| `contacts` | List of `{ type, label, value }`. Types: `phone`, `whatsapp`, `email`, `web`, `instagram`, `address`, or `link` with an `href` |
| `theme` | Colors: `accent`, `accent2`, `card`, `card2`, `ink`, `steel`, `stage` |
| `display` | Optional font family for the name (load it in `index.html` if it's a Google Font) |
| `background` | `{ type: "stage" }` for stage lights, `{ type: "image", src: "assets/bg.jpg" }`, or `{ type: "gradient", value: "linear-gradient(…)" }` |
| `saveContactButton` | `true` shows the Save contact (.vcf) button |

Put each person's images in their own folder, such as `assets/alejandro-castillo/photo.jpg`. Square photos around 600×600 px look best.

## Try it locally

Open `index.html` in a browser, or serve the folder so paths behave exactly like on GitHub Pages:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/?c=alejandro-castillo
```
