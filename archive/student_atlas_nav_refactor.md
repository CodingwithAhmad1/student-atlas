# Student Atlas — Navigation Refactor Spec

**Author:** Product  
**Status:** Ready for implementation  
**Scope:** Navigation restructure, new empty page scaffolding, frontend deactivations

---

## Overview

This document specifies the full navigation refactor for Student Atlas. The existing top navbar is removed and replaced with a left sidebar using the shadcn `sidebar-07` component. A breadcrumb replaces the top navbar area. All new content pages are scaffolded as empty templates. Existing pages and the news feed are hidden from the frontend but not deleted.

---

## 1. Install the sidebar component

Run the following command to add the sidebar:

```bash
npx shadcn@latest add sidebar-07
```

This installs the `sidebar-07` variant, which includes a collapsible left sidebar with section grouping, sub-item support, and the associated layout primitives (`SidebarProvider`, `SidebarInset`, `SidebarTrigger`, etc.).

---

## 2. Remove the existing top navbar

The current top navbar (`base.html` nav element with Home / News / Chatbot links) is to be **hidden from the frontend**. Do not delete the HTML or any associated CSS. Add a comment marking it as deactivated, e.g.:

```html
<!-- DEACTIVATED: top navbar replaced by left sidebar — do not delete -->
```

---

## 3. Left sidebar structure

The sidebar contains two distinct regions separated visually by a divider line:

- **Top region:** main navigation (the five sections below)
- **Bottom region:** report generation link (below the divider)

### 3a. Sidebar header

At the top of the sidebar, above all navigation items, display the app name and logo:

- Logo mark (the existing "SA" mark or equivalent)
- App name: **Student Atlas**

This maps to the `SidebarHeader` component in shadcn.

### 3b. Main navigation items and their sub-items

Each top-level item is a collapsible section. Sub-items appear when the parent is expanded. Only one section is open at a time. This maps to `SidebarMenu` with `SidebarMenuSub` for sub-items.

The five sections, with their sub-items, are as follows:

---

**Tourist visa**
- Entry requirement
- How to apply

---

**Student visa**
- Overview
- Documents
- Application process
- After arrival

---

**Work visa**
- Post-study work
- Getting sponsored

---

**Residency pathway**
- Permanent residency
- Citizenship
- Dual nationality

---

These four sections are the main nav group. They map to `SidebarGroup` > `SidebarGroupLabel` > `SidebarMenu`.

### 3c. Report generation (bottom, separated)

Below the main nav group, add a `SidebarSeparator` (the divider line). Below the separator, add a single item:

**Generate report**

This links to the `/report` route. It is visually distinct from the nav items above — it sits in its own `SidebarGroup` at the bottom of the sidebar with no label, just the item. Style it to be clearly actionable (e.g. slightly different weight or an icon if the shadcn component supports it).

This maps to a second `SidebarGroup` below the `SidebarSeparator`, containing a single `SidebarMenuItem`.

---

## 4. Breadcrumb (replaces top navbar area)

Where the top navbar previously sat, render a breadcrumb using the shadcn breadcrumb component consistent with the `sidebar-07` dashboard pattern (i.e. inside `SidebarInset` > header area).

The breadcrumb reflects the current location at all times. Examples:

- `Tourist visa  >  Entry requirement`
- `Student visa  >  Documents`
- `Residency pathway  >  Dual nationality`
- `Generate report`

When on a top-level section with no sub-item selected, show only the section name.

Use the same CSS and typography as the shadcn `sidebar-07` dashboard demo breadcrumb — do not introduce custom styles.

---

## 5. New pages — empty scaffolding

Create the following routes. Each page renders an empty template with the correct page title only — no content, no placeholder text. The sidebar and breadcrumb must function correctly on all of them.

| Route | Page title | Breadcrumb |
|---|---|---|
| `/visit/entry-requirement` | Entry requirement | Tourist visa > Entry requirement |
| `/visit/how-to-apply` | How to apply | Tourist visa > How to apply |
| `/student/overview` | Overview | Student visa > Overview |
| `/student/documents` | Documents | Student visa > Documents |
| `/student/application-process` | Application process | Student visa > Application process |
| `/student/after-arrival` | After arrival | Student visa > After arrival |
| `/work/post-study-work` | Post-study work | Work visa > Post-study work |
| `/work/getting-sponsored` | Getting sponsored | Work visa > Getting sponsored |
| `/residency/permanent-residency` | Permanent residency | Residency pathway > Permanent residency |
| `/residency/citizenship` | Citizenship | Residency pathway > Citizenship |
| `/residency/dual-nationality` | Dual nationality | Residency pathway > Dual nationality |
| `/report` | Generate report | Generate report |

The top-level section routes (`/visit`, `/student`, `/work`, `/residency`) should redirect to their first sub-item by default.

---

## 6. Deactivate existing pages and news feed

### 6a. Existing pages (Home, News, Chatbot)

Hide these from the frontend navigation. Do **not** delete routes, templates, or any associated logic. The routes remain accessible if navigated to directly — they are simply not linked from anywhere in the UI.

Add a comment to each template marking it as deactivated:

```html
<!-- DEACTIVATED: not linked from UI — do not delete -->
```

Affected templates: `index.html`, `news.html`, `chatbot.html`

### 6b. News feed — frontend

Remove any link, button, or reference to the news feed from the visible UI. The `/news` route remains intact.

### 6c. News feed — backend worker

Disable the background RSS fetch daemon. The cleanest approach is a feature flag in the app config:

```python
NEWS_WORKER_ENABLED = False
```

In `start_background_worker()`, wrap the thread start in a check:

```python
if app.config.get('NEWS_WORKER_ENABLED', False):
    # start daemon thread
```

Do **not** delete `start_background_worker()`, the RSS fetch logic, the `NewsUpdate` model, or any related code. Everything stays in place, switched off via the flag.

---

## 7. What is not in scope for this task

- No content population on any new page
- No mobile or responsive behaviour
- No changes to the database schema or models
- No deletion of any existing code, templates, routes, or assets
- No styling beyond what the shadcn sidebar-07 component provides out of the box
