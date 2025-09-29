# Netflix Clone · Craft & Code Reassessment

A polished Netflix landing page recreation built with **Next.js 14** and real-time content from the **TMDb API**. The project focuses on reusable component design, clean abstractions, and a production-quality look-and-feel.

## ✨ Highlights
- Hero banner featuring a spotlight title with immersive backdrop art
- Horizontal carousels for curated categories (Trending, Popular Movies, Top Rated, Binge-Worthy TV)
- Responsive layout, sticky navigation, accessibility-minded interactions, and keyboard-friendly controls
- Graceful fallback content when the TMDb API key is missing or rate-limited

## 🧱 Tech Stack
- [Next.js 14](https://nextjs.org/) (Pages Router)
- React 18
- CSS Modules + global utility style sheet
- Native `fetch` for server-side data loading

## 🚀 Getting Started

### 1. Clone & install dependencies
```pwsh
git clone <your-fork-url>
cd "netflix c&c"
npm install
```

### 2. Create a TMDb API key
1. Sign up at [https://www.themoviedb.org](https://www.themoviedb.org)
2. Navigate to *Settings → API* and create a **v3 API key**
3. In the project root, create a `.env.local` file:

```bash
TMDB_API_KEY=YOUR_V3_API_KEY
```

> **Note:** The key is read only on the server. If the variable is missing or TMDb is unreachable the UI will fall back to curated demo content.

### 3. Run the app
```pwsh
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## 🧭 Project Structure

```
components/
	Footer.js          # Footer with attribution & utility links
	Header.js          # Sticky navigation with dynamic section links
	Hero.js            # Featured title banner
	Layout.js          # Global meta tags & background shell
	MovieCard.js       # Poster tile with hover state
	MovieRow.js        # Horizontally scrollable carousel
lib/
	tmdb.js            # Data fetching + normalization + fallbacks
pages/
	index.js           # Home page composition + server-side data load
styles/
	*.module.css       # Component-scoped styles
	globals.css        # Base styles & resets
```

## ✅ Quality Tooling
- `npm run lint` runs the default Next.js ESLint config
- Consistent formatting via CSS Modules and shared design tokens in `globals.css`

## 🧪 Next Steps & Ideas
- Add authenticated flows (profile picker, watch list, etc.)
- Expand test coverage with component-level snapshots and interaction tests
- Enhance accessibility with reduced motion support and improved focus outlines

## 📄 License
This project is for educational purposes as part of the Craft & Code reassessment. Please keep the TMDb attribution intact when sharing demos.
