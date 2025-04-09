# Baseball Umpire Assistant

A modern web application designed to help baseball umpires make accurate decisions during games. The app provides instant access to MLB rules, interpretations, and AI-powered assistance for resolving disputes.

## Features

- 📚 Comprehensive MLB rules reference
- 🤖 AI-powered rules interpretation using OpenAI
- 🎯 Real-time dispute resolution assistance
- 📱 Modern, responsive UI
- 🎨 Beautiful, intuitive interface

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- OpenAI API key

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/itcambridge/umpire_app.git
   cd umpire_app
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
umpire_app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── umpire-app.tsx    # Main app component
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/              # Global styles
```

## Key Components

- **UmpireApp**: Main application component
- **RulesChat**: AI-powered rules interpretation interface
- **DisputePanel**: Handles specific dispute scenarios
- **GameHeader**: Displays game information

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- OpenAI API
- Radix UI Components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MLB Official Rules
- OpenAI for providing the AI capabilities
- The baseball umpiring community for their input and feedback 