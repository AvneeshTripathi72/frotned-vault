# Prompt Vault (Architecting Intelligence v1.0)

Welcome to **Prompt Vault**, the premium prompt architecture marketplace for elite AI engineers and creators. This platform allows users to explore, buy, and sell high-performance prompts that power AI models like ChatGPT, Midjourney, Claude, and more.

## Features

- 🛒 **Premium Prompt Marketplace**: Browse highly-engineered prompts categorized by AI model, profession, and use-case.
- 💳 **Secure Payments**: Integrated with Razorpay for seamless and secure transaction processing.
- 🔐 **User Accounts & Dashboard**: A comprehensive dashboard to track purchases, manage prompt sales, and view transaction history.
- 🎨 **Modular Dark-Themed UI**: Built using a sleek, premium, and fully responsive dark theme using Tailwind CSS and Framer Motion.
- 🚀 **Performance Optimized**: Built with Next.js 14 App Router, featuring Server Actions and aggressive API caching for speed.
- ☁️ **Cloudflare R2 Storage**: Assets such as prompt preview images are reliably stored via Cloudflare R2 object storage.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Authentication/Session**: Next.js custom auth logic
- **Payments**: [Razorpay](https://razorpay.com/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)

## Setup & Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Razorpay account (for local testing API keys)
- Cloudflare R2 bucket credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pluton-vivek/Prompt-mkt-library.git
   cd Prompt-mkt-library
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure Environment Variables:
   Copy the `.env.example` file to create your `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required variables (MongoDB, Razorpay, R2 API keys).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Highlights
- Fully Modular components placed in `src/components/`, sub-directories like `home/`, `ui/`, `prompt/`.
- Unified data models inside `src/models/` for Mongoose validation schemas.
- Route Handlers located in `src/app/api/` with edge caching setup.

## Contributing
Follow standard fork and pull-request workflow for contributing.

---
*© PROMPT_VAULT_ENGINEERING — ALL_SYSTEMS_GO*
