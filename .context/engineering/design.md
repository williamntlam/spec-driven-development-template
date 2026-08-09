# Design System & UI Guidelines

> Visual design tokens, component rules, and accessibility standards.
> Frontend work must consult this file before introducing new UI patterns.

---

## 1. Design Direction

Replace placeholders with your product's visual identity.

| Token | Value | Notes |
| :--- | :--- | :--- |
| **Brand name** | `{{PROJECT_NAME}}` | Hero-level brand signal on marketing surfaces |
| **Primary** | `#0F172A` | Placeholder — replace |
| **Accent** | `#2563EB` | Placeholder — replace |
| **Background** | `#F8FAFC` | Prefer atmospheric gradients/patterns over flat fills when designing branded pages |
| **Text** | `#0F172A` | Body copy |
| **Muted text** | `#64748B` | Secondary copy |
| **Danger** | `#DC2626` | Errors / destructive actions |
| **Success** | `#16A34A` | Success states |
| **Radius** | `8px` | Default control radius |
| **Spacing unit** | `4px` | Base scale (`4`, `8`, `12`, `16`, `24`, `32`, `48`) |

---

## 2. Typography

| Role | Font | Fallback | Notes |
| :--- | :--- | :--- | :--- |
| Display / brand | `{{DISPLAY_FONT}}` | `Georgia, serif` | Replace with expressive brand face |
| Body | `{{BODY_FONT}}` | `system-ui, sans-serif` | Readable UI body |
| Mono | `{{MONO_FONT}}` | `ui-monospace, monospace` | Code / IDs |

Avoid defaulting to Inter, Roboto, or Arial as the primary brand typefaces unless explicitly chosen.

---

## 3. Component Rules

- Prefer one clear composition per viewport on marketing / promotional surfaces.
- Cards are allowed only when they contain a user interaction; otherwise prefer open layout.
- Do not place detached badges, promo chips, or callout stickers on top of hero media.
- Each section should have one purpose, one headline, and usually one short supporting sentence.
- Motion should create presence and hierarchy (2–3 intentional motions for visually led work), not noise.

---

## 4. Accessibility

- Target WCAG 2.2 AA contrast for text and interactive controls.
- All interactive elements must be keyboard reachable with visible focus states.
- Images require meaningful `alt` text (or empty alt when purely decorative).
- Do not rely on color alone to convey state.
- Form fields need associated labels and actionable error messages.

---

## 5. Implementation Notes

- Define CSS variables (or design tokens) for colors, spacing, and type scales.
- Prefer the existing component library before inventing new primitives.
- Document any approved exceptions here when a spec intentionally diverges.
