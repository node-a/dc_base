# Aqua Access

Aqua Access is a modern, minimalist authentication platform designed with a focus on simplicity, security, and a premium user experience inspired by Apple's design philosophy.

## 🌟 Features

- **Apple-Style Minimalism**: A clean, spacious UI with a focus on typography and whitespace.
- **Secure Authentication**: robust account creation and login workflows powered by Supabase.
- **Session Management**: Secure token-based session handling with middleware protection.
- **AI Integration**: Built with Google Genkit, ready for intelligent agentic workflows.
- **Modern UI Components**: Leverages Radix UI primitives and Lucide icons for accessible, high-quality interfaces.
- **Vibrant Aesthetics**: Custom color palette featuring light grayish-blue backgrounds and subtle cyan accents.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Backend/Auth**: [Supabase](https://supabase.com/) & [Firebase](https://firebase.google.com/)
- **AI Tooling**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Supabase project for authentication
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

## 🎨 Design Principles

- **Clarity**: Ample white space and clean typography.
- **Responsiveness**: Fluid layouts that adapt to any screen size.
- **Smoothness**: Subtle transition animations for an intuitive feel.

---
Created by node-a
