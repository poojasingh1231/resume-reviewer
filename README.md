# AI Resume Reviewer

![AI Resume Reviewer](public/banner.png) <!-- Add a screenshot of your dashboard here -->

A modern, privacy-first web application that leverages AI to instantly review resumes. Built with **Next.js**, **Tailwind CSS**, and the **Vercel AI SDK**, it extracts text from PDF resumes entirely on the client side before securely streaming actionable career feedback via Google's Gemini API.

## ✨ Features

- 🔒 **Privacy First:** PDF text extraction happens locally in your browser using `pdfjs-dist`. Only raw text is sent to the AI, ensuring document metadata and embedded assets remain private.
- ⚡ **Instant AI Feedback:** Built with the Vercel AI SDK and Gemini 2.5 Flash for rapid, streaming JSON responses.
- 🎯 **ATS Scoring:** Get a clear 0-100 score indicating how well your resume is optimized for Applicant Tracking Systems.
- ✅ **Actionable Improvements:** Side-by-side "Original vs. Improved" text comparisons that explain *why* the changes matter.
- 🌗 **Premium UI/UX:** Fully responsive, modern dashboard design with seamless Light/Dark mode toggling.


## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Model:** Google Gemini 2.5 Flash (`@ai-sdk/google`)
- **PDF Extraction:** `pdfjs-dist` & `react-dropzone`
- **Theming:** `next-themes` & Lucide Icons

## 🚀 Getting Started

### Prerequisites

You will need a Google Gemini API key to run this project. You can get one for free from Google AI Studio.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/resume-reviewer.git
   cd resume-reviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

This project follows an "Architecture Sandwich" pattern to ensure maintainability:

```text
src/
├── app/
│   ├── api/review/route.ts  # Secure backend AI route (Vercel AI SDK)
│   ├── layout.tsx           # Global layout & ThemeProvider
│   └── page.tsx             # Main entry point
├── components/
│   ├── dashboard/           # UI Components (ScoreCard, Feedback)
│   ├── upload/              # PDF Dropzone logic
│   └── ui/                  # Reusable Shadcn UI components
└── lib/
    └── schema.ts            # Zod schemas for structured AI output
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YourUsername/resume-reviewer/issues).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
