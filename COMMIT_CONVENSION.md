# Git Commit Message Convention

To keep our Git history consistent, readable, and easy to work with, we follow the [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) standard.

---

## 📌 Commit Format
```
<type>(optional scope): short summary

[optional body]

[optional footer(s)]
```


### Example:
```
feat(profile): add avatar upload form
```

This introduces a new profile section allowing users to upload their avatar.

---

## 🧩 Commit Types

| Type        | Description                                               |
|-------------|-----------------------------------------------------------|
| `feat`      | A new feature (UI, logic, route, functionality)           |
| `fix`       | A bug fix                                                 |
| `refactor`  | Code change without changing behavior                     |
| `style`     | UI/style-only changes (no logic)                          |
| `docs`      | Documentation updates                                     |
| `chore`     | Build system, tooling, configs, or dependency updates     |
| `test`      | Adding or updating tests                                  |
| `ci`        | CI/CD pipeline updates                                    |

---

## 🧱 Commit Strategy (Migration Process)

We often work in two steps: first UI, then functionality. Here's how to commit:

### 1. Build UI or Scaffold
> `feat` — you added a visible structure, even without logic yet.

```bash
feat(home): scaffold layout for homepage
feat(discounts): build static UI for discount cards
```

### 2. Add Logic or API Integration

> `feat` — the UI becomes functional.

```bash
feat(discounts): connect discount list to backend
feat(auth): handle login with JWT
```

### 3. Refactor Components or Extract Logic
> `refactor` — same behavior, cleaner code.

```bash
refactor(discounts): extract DiscountCard component
```

## 4. Fix a Bug or Edge Case
> `fix` — correcting broken behavior.

```bash
fix(profile): fix crash on missing user data
```

### 5. Update Styles, Colors, or Layouts
> `style` — purely visual changes.

```bash
style(global): update font sizes and spacing
````


## Rules of Thumb
- Use present tense, imperative voice: add, fix, create, not added or creating

- Should keep the first line under 70 characters

- Use scope (feat(profile):) when possible

- Group related changes into one commit; split unrelated ones