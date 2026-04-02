# Lumina 1.0 | Neural Interface

Lumina 3.0 is a cutting-edge AI frontend built with **Next.js 15+** and **Tailwind CSS**. It serves as the primary gateway to the Lumina Neural Ecosystem, offering a seamless, high-performance interface for chat synthesis, architectural image generation, and deep document analysis.

## 🌌 Core Interface Features

* **Adaptive Chat Interface:** Powered by `framer-motion` for fluid, real-time message transitions.
* **Architect Mode:** A dedicated UI toggle for high-fidelity generative imaging.
* **Document Protocol:** Drag-and-drop support for PDF, DOCX, and TXT analysis.
* **Neural Sidebar:** Fast switching between active "Protocols" (chat threads).
* **Markdown Synthesis:** Full support for syntax highlighting and GitHub-flavored markdown.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [React Icons / Tabler Icons](https://react-icons.github.io/react-icons/)
* **Networking:** [Axios](https://axios-http.com/) with centralized API interceptors.

---

## ⚙️ Local Development

### 1. Clone & Enter
```bash
git clone [https://github.com/batoolamina/lumina-frontend.git](https://github.com/your-username/lumina-frontend.git)
cd lumina-frontend
```

### 2. Installation & Setup

**Install Dependencies**
   ```bash
   npm install
   # or
   yarn install 
   ```

### 3. Environment Setup

**Create Environment Variables**
   Create a `.env.local` file in the root directory and add your backend URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

### 4. Run the Engine

**Start the Development Server**
   ```bash
   npm run dev
   ```

**Access the Interface**
Navigate to http://localhost:3000 to access the Lumina neural interface.

## 📂 Architecture Overview
```text
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Reusable UI components (Sidebar, Header, etc.)
├── lib/                # API configurations and utility functions
├── public/             # Static assets and neural branding
└── styles/             # Global CSS and Tailwind configurations
```
