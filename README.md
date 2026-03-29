# ✨ Smart Email Assistant

A full-stack, AI-powered email reply generator integrated directly into your Gmail inbox!

This project harnesses the power of the **Google Gemini API** to read incoming emails and generate context-aware, highly personalized drafts instantly. The assistant seamlessly bridges a custom Chrome Extension with a robust **Spring Boot** backend and a stunning **React.js Dashboard**.

![License](https://img.shields.io/badge/License-MIT-blue)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)

---

## 🌟 Key Features

### 🧩 Seamless Chrome Extension
- **Native Injection:** The extension perfectly integrates a `✨ AI Reply` floating button directly next to Gmail's native `Send` button.
- **Interactive Draft Modal:** Click the button to open a beautiful, frosted-glass popup where you can preview the generated draft.
- **Custom Prompts:** Want the AI to write something specific? Type instructions like *"Tell them I'm sick"* right into the extension popup!
- **Tone & Length Control:** Instantly switch between Formal/Casual tones or Short/Long reply lengths.

### 📊 React SPA Dashboard
- **Analytics & Metrics:** View your total emails generated, estimate your time saved, and track your most frequently used personas.
- **Live Search History:** The `History` tab seamlessly queries your generated email database, allowing you to search past drafts.
- **Custom Tones:** Use the `Settings` page to define your own unique, custom AI personas (e.g. *Witty*, *Sarcastic*, *Steve Jobs style*) and save them directly to the database.

### 💻 Spring Boot Backend
- A fast, secure REST API handling requests from both the React Dashboard and the Chrome Extension.
- Custom `.env` variable ingestion to securely shield API keys.
- Complete asynchronous handling of Gemini WebClient integration.

---

## 🛠️ Installation & Setup

### Prerequisites
- Java 21+ & Maven
- Node.js & npm
- Google Gemini API Key

### 1. Backend Setup
1. Open the `backend/` directory.
2. Create a `.env` file based on `.env.example`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
   ```
3. Run the Spring Boot server:
   ```bash
   ./mvnw spring-boot:run
   ```

### 2. Frontend Dashboard Setup
1. Open the `frontend/` directory.
2. Install dependencies and start the Vite development server:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` to view the beautiful Analytics Dashboard.

### 3. Chrome Extension Setup
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (top right corner).
3. Click "Load unpacked" and select the `extension/` directory from this repository.
4. Open Gmail, hit **Reply**, and enjoy your AI assistant!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
