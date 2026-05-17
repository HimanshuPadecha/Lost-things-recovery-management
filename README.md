# Lost Item Recovery Management

Welcome to **Lost item Recovery management**, a project built by our team during **Parul University's Hackathon**.

> [!NOTE]
> **Project Status:** This project was developed during the hackathon and is currently **75% complete**.

## 📖 About the Project

**Overflow** is a platform dedicated to **lost item recovery**, designed to reunite people with their misplaced belongings using AI-powered verification.

### How It Works:
1. **Item Registration**: The finder registers the lost item they found on our platform.
2. **AI Description Generation**: Our application feeds the provided information to an AI model, which generates a highly detailed description of the item.
3. **Owner Recognition**: The original owner browses the website, finds the listing, and recognizes their lost item.
4. **Ownership Verification Test**: To claim the item, the owner applies for a verification test. The AI uses the item's detailed description to automatically generate a unique set of specific questions.
5. **Test Validation**: The owner takes the test, and the AI validates their answers to confirm ownership.
6. **Successful Reunion**: If the AI verifies the claim is legitimate, the platform connects the finder and the owner so they can meet and successfully return the item!

## 🚀 Tech Stack

This project is built using a modern, full-stack web development ecosystem:

- **Framework**: [Next.js](https://nextjs.org/) (v16)
- **Language**: TypeScript
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **API Layer**: [tRPC](https://trpc.io/) for end-to-end typesafe APIs, powered by [React Query](https://tanstack.com/query/latest)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI Primitives, Framer Motion (for animations), and Lucide React (for icons)
- **File Uploads**: [UploadThing](https://uploadthing.com/)
- **Background Jobs/Workflows**: [Upstash Workflow](https://upstash.com/docs/workflow/getstarted)
- **Generative AI**: Google GenAI integration (`@google/genai`)
- **Package Manager**: Bun

## 🛠️ Getting Started

First, install the dependencies using Bun:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
