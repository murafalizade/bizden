# Bizdən Frontend

This is the frontend for the **Bizdən** platform, built with [Next.js](https://nextjs.org) using modern React features, TypeScript, and a tailored styling approach.

---

## 🚀 Tech Stack

- **Next.js (App Router)** with TypeScript
- **Tailwind CSS** for layout, typography, and basic styling
- **Ant Design** components (only `Table`, `Form`, `Button`, `Card`)
- **React Query** for data fetching and caching
- **Yup** for validation schemas
- **React Hook Form** for form state management

---

## 🎨 Styling Guidelines

- ✅ Use **Tailwind CSS** classes exclusively on HTML elements (`div`, `section`, `h1`, `p`, etc).
- ❌ **Do NOT** use inline styles on HTML elements.
- ✅ Use **Ant Design** components for `Table`, `Form`, `Button`, and `Card` only.
- ✅ Inline styles are allowed **only** within Ant Design components (e.g., `<Button style={{ margin: 12 }} />`).
- ❌ Avoid using other AntD components or mixed inline styles in HTML.

---

## 📁 Folder Structure & Conventions

```

app/
├─ page.tsx                  # Server component page by default
├─ components/               # Folder for client components only
│    ├─ SomeComponent/
│    │    ├─ index.tsx       # Component with "use client"
│    │    ├─ SomeComponent.test.tsx
│    │    └─ SomeComponent.stories.tsx
└─ ...
libs/
├─ redux/                    # Redux slices and store setup
├─ services.ts               # API functions, React Query hooks, Axios config
├─ models.ts                 # TypeScript interfaces and types
└─ constants.ts              # Global constants

````

- All `page.tsx` files should be **server components** by default.
- Components that require client features (hooks, interactivity) must be placed in `components/` and begin with `"use client";`.
- Each component must be in its **own folder**, with an `index.tsx` and re-export via `index.ts`.
- Prefer keeping styling with Tailwind; use `styles.css` per component only if necessary.

---

## ⚙️ Component Generator

To streamline component creation under a specific page route:

### Command:

```bash
npm run generate-component <pageFolder>/<componentName> <ComponentName>
````

### Example:

```bash
npm run generate-component (authless)/login Login
```

This will create the following structure inside `app/(authless)/login/components/Login/`:

```
Login/
  ├─ index.tsx             # Component with "use client"
  ├─ Login.test.tsx        # Jest test: renders without crashing
  ├─ Login.stories.tsx     # Storybook story
  ├─ index.ts              # Re-export file
```

> ✅ Ensures consistent structure and speeds up development.

---

## 🧪 Testing

Run unit tests using **Jest**:

```bash
npm test
# or
npx jest
```

Make sure `jest.config.js` is properly configured for TypeScript and Next.js.

---

## 🖼️ Storybook

To start Storybook for UI component development:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser to explore components.

---

## ▶️ Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Ant Design Components](https://ant.design/components/overview/)
* [React Query](https://tanstack.com/query/latest)
* [React Hook Form](https://react-hook-form.com/)
* [Yup Validation](https://github.com/jquense/yup)

---

## 🚀 Deployment

You can deploy your app to the **Vercel** platform (creators of Next.js):

* [Deploy on Vercel](https://vercel.com/new)
* [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
