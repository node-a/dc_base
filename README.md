# DC Base

DC Base (standing for DC Database) is a modern authentication and data management platform designed with a focus on simplicity, security, and a clean **minimal style**.

## 🌟 Features

- **Minimal Style**: A clean, spacious UI with a focus on functional design and clarity.
- **Secure Authentication**: Robust user authentication workflows powered by **Supabase Auth**.
- **Integrated Database**: Data is hosted and securely managed on **Supabase**, providing a scalable and high-performance backend.
- **Optimized Deployment**: Built for seamless deployment and scaling on **Firebase App Hosting**.
- **Session Management**: Secure token-based session handling with middleware protection.
- **AI Integration**: Built with Google Genkit, ready for intelligent agentic workflows.
- **Modern UI Components**: Leverages Radix UI primitives and Lucide icons for accessible, high-quality interfaces.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **AI Tooling**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Supabase project for authentication and database
- Environment variables configured in `.env.local`

### Installation

```bash
# Clone the repository
git clone https://github.com/node-a/dc_base.git
cd dc_base

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Start Genkit developer UI
npm run genkit:dev
```

The application will be available at `http://localhost:9002`.

## 📁 Project Structure

- `src/app`: Next.js pages and layouts (authentication flows, dashboard).
- `src/ai`: Genkit AI flow definitions and development scripts.
- `src/components`: Reusable UI components (login forms, logos, layouts).
- `src/lib`: Core utilities (Supabase client, helper functions).
- `docs/`: Design blueprints and project documentation.

## 🚢 Deployment

DC Base is designed to be deployed onto **Firebase App Hosting**. 

1. Ensure your project is connected to Firebase.
2. The `apphosting.yaml` and `.idx` configurations are optimized for this environment.
3. Database and Auth remain served by Supabase.

---
Created by node-a
