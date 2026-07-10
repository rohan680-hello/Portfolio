# 🚀 Rohan Pal - Professional Portfolio

Welcome to my personal developer portfolio! This is a modern, premium, and fully responsive portfolio website showcasing my technical skills, featured projects, and qualifications as a Software Engineer & AI/ML Developer.

🌐 **Live Demo:** [https://rohan680-hello.github.io/Portfolio/](https://rohan680-hello.github.io/Portfolio/)

---

## ✨ Features

- **🎨 Modern Design & Aesthetics:** High-end dark mode design featuring smooth gradients, glassmorphism elements, custom scrollbars, and vibrant colors (electric cyan, deep violet, and teal).
- **🕸️ Interactive 3D Canvas Sphere:** An interactive, mouse-tracking 3D particle constellation sphere on the landing hero section built using HTML5 Canvas and Vanilla JS.
- **⚡ Fast Performance:** Built and structured on **Vite** for rapid local compilation and optimized asset loading.
- **📊 Real-time Stats & Animations:** Count-up counters for key stats and scroll-reveal transitions as you navigate the sections.
- **📱 Fully Responsive:** Adaptive layout from mobile screens up to large desktops, with a custom mobile navigation overlay.
- **✉️ Asynchronous Contact Form:** Integrated with FormSubmit AJAX API including state transitions (loading state, success state overlay, and error fallback notifications).

---

## 🛠️ Technical Arsenal (Skills)

* **Languages:** C++, Java, Python, JavaScript, HTML5, CSS3
* **Web & Backend:** Spring Boot, REST APIs, JDBC, React.js
* **AI & Machine Learning:** Reinforcement Learning, TensorFlow, NLP (NLTK, VADER), CNN, OpenCV
* **Databases & Tools:** MySQL, MongoDB, SQL, Git/GitHub, CI/CD (GitHub Actions), Docker, Postman, Vite

---

## 📁 Featured Projects

1. **📓 Journal App (Java/Spring Boot/MongoDB)**
   - Spring Boot REST API for private journal entries with MongoDB, Basic Auth, Swagger documentation, and automated GitHub Actions CI/CD.
2. **👥 EMPsystem (Java/Swing/MySQL)**
   - Comprehensive desktop CRUD application for employee management applying strict OOP encapsulation across 10+ core classes to eliminate duplication.
3. **⚙️ CPU Scheduler (AI - Python/RL/HTML/CSS)**
   - Dynamic CPU process scheduling utilizing Reinforcement Learning and predictive modeling to adapt process strategies. Features a live dashboard.
4. **👁️ Handwritten Digit Recognition (Python/TensorFlow/OpenCV)**
   - A 3-layer Convolutional Neural Network (CNN) trained on the MNIST dataset achieving 92% precision, integrated with an OpenCV image processing pipeline.
5. **💬 SentiAnalysis (Python/NLP/Matplotlib)**
   - Text emotion and sentiment analysis pipeline processing 5,000+ data samples with custom tokenization to reduce noise.
6. **🛒 Amazon UI Clone (HTML5/CSS3/UI/UX)**
   - Fully responsive desktop UI clone simulating core Amazon component structures from scratch focusing on semantic markup.
7. **🤖 Gemini Clone (React.js/Gemini API/Tailwind)**
   - Responsive chat client mimicking the Google Gemini interface. Supports persistent multi-turn conversation logs in localStorage and Visual OCR requests utilizing Base64 file streaming.
8. **📊 AI CRM Dashboard (React/MongoDB/Express/Node.js)**
   - Full-stack CRM platform containing contact lists, analytical charts (Recharts), JWT login sessions, tasks/notes modules, and automated CRM scripts.
9. **📋 Task Manager (React/Express/Node.js)**
   - Full-stack task board tracking status metrics and overdue flags, supported by search inputs and backend JSON file persistence.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohan680-hello/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build the production bundle:**
   ```bash
   npm run build
   ```
   The compiled assets will be built into the `dist/` directory.

---

## 🛸 Deployment

This project is configured for automated deployment to **GitHub Pages** using **GitHub Actions**.

- **Workflow File:** `.github/workflows/deploy.yml`
- **Trigger:** On every push to the `main` branch, the workflow:
  1. Installs Node.js and packages.
  2. Builds the production build via `npm run build` using the configured `/Portfolio/` base path.
  3. Uploads the generated `dist/` directory and deploys it directly to GitHub Pages.
