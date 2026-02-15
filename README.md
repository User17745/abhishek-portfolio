# Abhishek Aggarwal - Portfolio

Personal portfolio website showcasing 10+ years of experience in eCommerce, Product Management, Pre-Sales Solutioning, and Program Management.

## Tech Stack

- **Framework:** Astro 4.x
- **UI Components:** React 18 + shadcn/ui
- **Styling:** Tailwind CSS 4.x
- **Language:** TypeScript
- **Build Tool:** Vite

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── sections/     # Page sections
│   │   └── layout/       # Header, Footer, ThemeToggle
│   ├── data/             # Static content data
│   ├── layouts/          # Page layouts
│   ├── lib/              # Utilities and config
│   ├── pages/            # Route pages
│   └── styles/           # Global styles
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── adr/              # Architecture Decision Records
│   ├── architecture.md
│   ├── demo.md
│   ├── non-technical-summary.md
│   └── technical-roadmap.md
├── docker/               # Docker configuration
├── tests/                # Test files
└── .github/workflows/    # CI/CD workflows
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

```bash
# Build image
docker build -f docker/Dockerfile -t portfolio .

# Run container
docker run -p 4321:80 portfolio
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## CI/CD

- **CI:** Runs on all PRs and main branch pushes
- **Checks:** Lint, typecheck, build, test
- **CD:** Automatic deployment on main branch

## Deployment

Deployed via Vercel/Netlify with automatic deploys from main branch.

## License

MIT

## Contact

- **Email:** aggarwal039517@gmail.com
- **LinkedIn:** [abhishek-aggarwal-8bb82b100](https://www.linkedin.com/in/abhishek-aggarwal-8bb82b100/)
