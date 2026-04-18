# Admin Management V1

Administrative platform for affiliate marketing operations, built with Next.js, React 19, Better Auth, and MySQL.

This repository is in its early development stage. The project foundation is already in place, but many business features described in the product vision are still being implemented.

## Overview

The goal of this project is to provide a central workspace for managing affiliate marketing operations through a secure web application. The platform is intended to unify dashboards, operational workflows, authentication, reporting, CRM-oriented processes, and future campaign management capabilities in a single admin experience.

At this stage, the repository already contains the initial application shell, authentication base, dashboard structure, UI system, email templates, and environment validation.

## Project Status

Current maturity: early-stage product foundation.

What already exists:

- Next.js App Router application structure.
- Authentication base using Better Auth.
- MySQL connection and schema foundation.
- Shared UI components and dashboard layout scaffolding.
- Email templates for account-related flows.
- Environment variable validation with Zod.
- Build, formatting, and linting scripts.

What is still in progress:

- Affiliate campaign management workflows.
- KPI and performance reporting connected to real business data.
- CRM modules and pipeline management.
- Calendar and operational scheduling features.
- Access control hardening and production readiness.

This README is intentionally written to reflect the current reality of the codebase, not the final planned product.

## Product Vision

The broader product direction is to support affiliate marketing teams and operations with a unified internal platform that can help:

- organize campaigns, links, channels, and offers;
- monitor business and performance metrics in one place;
- centralize operational and client-related processes;
- improve visibility, consistency, and execution across the operation.

The main product goals are documented in `docs/Project-objective.md`.

## Core Stack

- Next.js 16
- React 19
- TypeScript
- Better Auth
- MySQL (`mysql2`)
- Zod
- Tailwind CSS 4
- Radix-based UI primitives and shared internal UI components
- Recharts for dashboard visualizations
- Resend for email delivery
- Biome for formatting and linting

## Repository Structure

```text
.
├── docs/                 # Product and project documentation
├── public/               # Static assets
├── scripts/              # Utility and database-related scripts
└── src/
	├── app/              # Next.js App Router routes and layouts
	├── components/       # Shared UI and domain components
	├── core/             # App configuration, constants, and logger
	├── database/         # Database connection, schema, and shared DB utilities
	├── hooks/            # Reusable hooks
	├── lib/              # Auth, cache, axios, and general helpers
	└── services/         # External integrations and service layer
```

## Getting Started

### Prerequisites

- Node.js LTS
- pnpm
- MySQL database
- Resend account or valid email provider configuration compatible with the current setup

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root and provide the required variables.

Public variables:

```bash
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_SIDEBAR_TITLE=
NEXT_PUBLIC_DEVELOPER_NAME=
NEXT_PUBLIC_DEVELOPER_URL=
NEXT_PUBLIC_COMPANY_NAME=
NEXT_PUBLIC_COMPANY_PHONE=
NEXT_PUBLIC_COMPANY_EMAIL=
NEXT_PUBLIC_COMPANY_WHATSAPP=
NEXT_PUBLIC_COMPANY_META_TITLE_MAIN=
NEXT_PUBLIC_COMPANY_META_TITLE_CAPTION=
NEXT_PUBLIC_COMPANY_META_DESCRIPTION=
```

The application validates environment variables at startup. If any required value is missing or invalid, the server will fail fast.

### Run Locally

```bash
pnpm dev
```

By default, the local development server runs with dotenv loading from `.env`.

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build the application for production
pnpm start    # Start the production server
pnpm lint     # Run Biome checks
pnpm format   # Format the codebase with Biome
```

## Current Functional Areas

The current repository already includes foundations for these areas:

- authentication screens and auth-related flows;
- dashboard layout and reporting-oriented UI scaffolding;
- reusable UI component library;
- email templates for verification, password reset, invitations, and account actions;
- database and service-layer organization for future expansion.

Some screens and routes are still placeholder implementations while the product structure is being established.

## Development Notes

- The home route currently redirects to the dashboard area.
- The codebase uses the App Router structure from Next.js.
- Configuration and environment validation are centralized to reduce runtime surprises.
- This repository favors building the product foundation first before expanding business workflows.

## Roadmap Direction

The expected next milestones for this repository include:

- replacing dashboard placeholders with connected business data;
- implementing campaign and affiliate management workflows;
- expanding CRM and operational modules;
- strengthening access rules, validation, and production readiness;
- improving documentation as the product scope becomes concrete.

## Contributing

This project is still under active structuring. If you contribute, prefer small and focused changes that improve the foundation, maintain consistency with the existing architecture, and avoid introducing speculative abstractions.

Before opening larger changes, align the implementation with the product direction documented in `docs/Project-objective.md`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
