# resume-render

A React-based resume renderer that reads a `resume.yaml` file and renders it as a styled, print-friendly web page.

## Overview

The app fetches `resume.yaml` at runtime, parses it with [js-yaml](https://github.com/nodeca/js-yaml), and renders the following sections:

- **Profile** — name, occupation, location, email, phone, LinkedIn
- **Skills** — grouped rows of skills, optionally rendered as tags
- **Education** — schools with degrees, date ranges, and optional internships
- **Experience** — employers with one or more positions, each with a title, date range, summary, and bullet points
- **Projects** — personal/side projects with title, date range, and summary

Layout is a two-column design: skills, education, and projects on the left; experience on the right.

## Setup

**Prerequisites:** [Node.js](https://nodejs.org) (LTS recommended)

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```bash
npm run build
```

## Editing

Click the **Edit** button in the top-left of the resume to switch to split mode. There are three viewing modes:

| Mode | Description |
|---|---|
| **View** | Full-screen rendered resume |
| **Split** | Editor on the left, live preview on the right (default when editing) |
| **Edit Only** | Full-screen YAML editor |

In split mode the preview updates automatically as you type whenever the YAML is valid. The toolbar also has **Save** (download `resume.yaml`) and **Load** (upload a YAML file) buttons.

## resume.yaml

Place `resume.yaml` in the `public/` directory. This file is excluded from version control (see `.gitignore`) since it contains personal contact information. If no `resume.yaml` is present, the app loads `public/resume.sample.yaml` as a placeholder.

Use the structure below as a template:

```yaml
profile:
  name: Your Name
  occupation: Your Title
  location: City, State
  email: you@example.com
  tel: (555) 555-5555
  linkedin: your-linkedin-handle

skills:
  - [Skill1, Skill2, Skill3]
  - [Skill4, Skill5]

education:
  schools:
  - school: University Name
    location: City, State
    end: May YYYY
    degrees:
    - B.S. in Your Major

experience:
- employer: Company Name
  location: City, State
  positions:
  - title: Your Title
    start: Mon YYYY
    end: Present        # or Mon YYYY
    summary: One-line summary of your role.
    bullets:
    - Accomplishment one.
    - Accomplishment two.

projects:
- title: Project Name
  start: YYYY
  end: YYYY
  summary: Brief description of the project.
```

## Printing

The page is styled for print. Use your browser's print dialog (or Ctrl+P / Cmd+P) to save as PDF. Print-specific styles hide non-essential UI elements automatically. Print margins are set to 0.5in.
