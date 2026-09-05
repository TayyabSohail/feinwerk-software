---
name: boilerplate-project-standards
description: Canonical implementation standards for this Next.js Supabase boilerplate. Use for any coding task in this repository, especially when stack, architecture, auth, UI, form, React Query, Supabase, routing, migration, or QA conventions are needed. Resolves conflicts between local docs and external skills.
---

# Boilerplate Project Standards

Apply these standards for all work in this repository.

## Priority and conflict resolution

Use this order when guidance conflicts:

1. Explicit user instruction in current chat
2. Local project rules in `.cursor/rules/*.mdc`
3. This skill
4. Local docs in `docs/*`
5. Generic external skills

If external skills conflict with this skill or local docs, follow this repository's standards.

## Stack and tooling baseline

- Next.js App Router with TypeScript strict mode.
- React 19 and `@tanstack/react-query` v5.
- UI stack: shadcn + Radix + Tailwind.
- Forms: React Hook Form + Zod + local form wrappers.
- Backend/data: Supabase + next-safe-action.
- Package manager: `pnpm`.

## Architecture and file placement

- Follow `docs/foundation/directory-structure.md`.
- Use technical layer first, then feature grouping.
- Use these locations:
  - Queries: `src/hooks/queries/*`
  - Mutations: `src/hooks/mutations/*`
  - Safe-action hooks: `src/hooks/actions/*`
  - Server actions: `src/actions/*`
  - Schemas: `src/schema/*`
  - Routes constants: `src/constants/paths.ts`
- Use explicit filenames; avoid `index.ts` and `index.tsx`.

## Naming and imports

- Files: kebab-case.
- Components/types: PascalCase.
- Functions/hooks/schemas: camelCase (hooks start with `use`).
- Prefer absolute imports with `@/`.
- Reuse existing helpers before writing new utility functions.

## Next.js execution model

- Default to Server Components.
- Add `"use client"` only when required (state, effects, browser APIs, event handlers).
- Keep client-only logic in leaf components.
- Use `next/image` for images and include explicit dimensions.
- Use route-level error/loading/not-found patterns where appropriate.
- Keep data fetching close to server boundaries and avoid client waterfalls.

## Routing

- Use centralized `paths` from `src/constants/paths.ts`.
- Do not hardcode route strings outside `paths.ts`.
- For dynamic routes, use path builder functions in `paths`.

## UI system conventions

- Reuse existing shadcn components before custom markup.
- Use semantic Tailwind tokens (`bg-background`, `text-foreground`, `border-border`), not hardcoded color classes.
- Use `cn` from `src/lib/utils.ts` for conditional class composition.
- Add shared visual patterns as variants in base UI components instead of ad-hoc duplication.
- Prefer responsive, accessible UI by default.

## Button conventions (repo-specific)

- Use local `Button` API from `src/components/ui/button.tsx`.
- Use `isLoading` for loading states.
- Use `icon` and `iconLeft` props for icons (do not pass icons as raw children).
- For navigation, wrap `<Button>` with `<Link>`, not the other way around.

## Form conventions (repo-specific)

- Follow `docs/ui/form.md` and existing wrappers under `src/components/ui/form/*`.
- Use React Hook Form + Zod resolver patterns already used in repo.
- For forms with more than two fields, default to RHF.
- Show field-level errors and use meaningful validation messages.
- Disable submit interactions while submitting to prevent duplicate writes.

## Data layer conventions

- Use `@tanstack/react-query` v5 APIs.
- Use stable query keys and centralized key constants.
- Use `authQuery` patterns where applicable for authenticated queries.
- For writes:
  - Safe actions -> `useAction` and shared error handling.
  - Plain server functions/endpoints -> `useMutation`.
- Invalidate affected queries on successful writes.
- Do not fetch server data with ad-hoc `useEffect` patterns.

## Supabase and auth conventions

- Keep RLS enabled by default.
- Never expose service role credentials to the browser.
- Keep privileged logic on the server.
- Avoid heavy database calls in middleware.

Repository-specific auth policy:

- `user_metadata.user_type` is accepted for app-level role checks in existing patterns.
- Do not migrate role checks to `app_metadata` unless explicitly requested by the user.
- Keep `authQuery` and middleware role patterns consistent with current codebase conventions.

## Environment and secrets

- Define and validate env vars through `src/env.ts`.
- Keep secrets in server-only env vars.
- Use `NEXT_PUBLIC_*` only for values intended for the client.
- Never commit secrets or sensitive `.env*` values.

## Supabase migrations and DB workflow

- Make schema changes in dev first.
- Generate migration files through Supabase CLI workflow used by the project.
- Review SQL for safety and idempotence where possible.
- Apply migrations to production only after code deploy readiness checks.
- Prefer migration-based auditability over manual production dashboard changes.

## Quality gates and QA

- Run `pnpm lint`, `pnpm typecheck`, and formatting checks for meaningful edits.
- Validate loading, error, empty, and success states for UI work.
- Confirm auth and permission paths for backend-sensitive changes.
- Include manual verification steps aligned with `docs/team/qa-and-acceptance-criteria.md`.

## Curated additions from external skills

These additions are adopted because they strengthen quality and do not conflict with local standards:

- Use explicit Suspense and boundary patterns when hooks/components require them.
- Prefer structured query keys and selective invalidation over broad cache resets.
- Validate external/untrusted input at boundaries with Zod (`safeParse` where appropriate).
- Avoid double validation in the same request path unless needed for UX.
- Keep external SDK and platform APIs version-aware; verify docs when behavior is uncertain.

## Non-goals and explicit exclusions

- Do not replace local button/form APIs with generic shadcn patterns that conflict with this repo.
- Do not force React Query v3/v4 style imports or APIs.
- Do not apply generic auth-metadata restrictions that override this repository's explicit policy.
