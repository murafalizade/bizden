# Bizdən Frontend

This is the frontend for the **Bizdən** platform, built with [Next.js](https://nextjs.org) using modern React features, TypeScript, and a tailored styling approach.

---

## Tech Stack

* **Next.js (App Router)** with TypeScript
* **Tailwind CSS** for layout, typography, and basic styling
* **Ant Design** components only for Table, Form elements, Button, Card
* **React Query** for data fetching and caching
* **Yup** for validation schemas
* **React Hook Form** for form state management

---

## Styling Guidelines

* Use **Tailwind CSS** classes exclusively on HTML elements (`div`, `section`, `h1`, `p`, etc).
* Do **NOT** use inline styles on HTML elements.
* Use **Ant Design** components (`Table`, `Form`, `Button`, `Card`) as needed; inside AntD components, inline styles are allowed.
* Avoid mixing inline styles on plain HTML elements; keep consistent styling through Tailwind CSS classes.

---

## Folder Structure and Usage Conventions

```
app/
  ├─ page.tsx                  # Main server component page
  ├─ components/               # Client components only, separate folders per component
  │    ├─ SomeComponent/
  │    │    ├─ index.ts        # Client component with "use client"
  │    │    └─ styles.css      # component-specific styles (if any)
  │    └─ ...
libs/
  ├─ redux/                    # Redux slices and store setup
  ├─ services.ts               # API calls, react-query hooks, axios instance
  ├─ models.ts                 # TypeScript types and interfaces
  └─ constants.ts              # App-wide constants
```

* **page.tsx** files should be server components by default.
* Any React components that need to use hooks, state, or client-only logic must be put inside `components/` folder and use `"use client";` directive at the top.
* Each folder inside `components/` should export a single component as default or named export in its own `index.tsx`.
* Re-export components or utilities from each folder's `index.ts` to facilitate cleaner imports.

---

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

Start editing your pages under `app/` and components under `components/`. Tailwind CSS will automatically apply styles, and Ant Design components can be used as specified.

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Ant Design Documentation](https://ant.design/components/overview/)
* [React Query Documentation](https://tanstack.com/query/latest)
* [React Hook Form Documentation](https://react-hook-form.com/get-started/)
* [Yup Validation](https://github.com/jquense/yup)

---

## Deployment

Deploy your Bizdən frontend using the [Vercel Platform](https://vercel.com/new) with zero configuration. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---
