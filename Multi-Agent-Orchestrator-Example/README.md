# Cricket Team AI - Multi-Agent Orchestrator

A modern, AI-powered multi-agent system for cricket team management with an interactive web interface. Features a beautiful blue and black themed UI with 5 specialized cricket coaching agents.

## What This Application Has

### **Frontend Features**
- 🎨 **Modern Blue/Black UI**: Sleek gradient design with smooth animations
- 🤖 **5 Specialized AI Agents**: Each with unique roles and capabilities
- 💬 **Interactive Agent Chat**: Click any agent to interact and get AI-powered responses
- 🔄 **Workflow Execution**: Execute complete multi-agent workflows for team preparation
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ✨ **Smooth Animations**: Powered by Framer Motion for fluid user experience

### **AI Agents**

| Agent | Role | Capabilities |
|-------|------|-------------|
| **🎯 Head Coach** | Strategic Planning | Match strategy, opponent analysis, team motivation, game plans |
| **🏏 Batting Coach** | Batting Excellence | Technique improvement, training drills, weakness analysis |
| **⚡ Bowling Coach** | Bowling Mastery | Performance analysis, skill development, strategy design |
| **💪 Head Physio** | Health & Fitness | Fitness assessment, injury prevention, recovery plans |
| **👤 Player** | Performance Execution | Skill execution, performance reporting, training feedback |

### **Backend Features**
- 🔌 **FastAPI REST API**: High-performance async backend
- 🧠 **Groq AI Integration**: Powered by Llama 3.3 70B model
- 🔄 **Multi-Agent Orchestration**: Coordinate multiple agents in workflows
- 🎭 **Custom Agent Support**: Extensible architecture for new agents
- ⚡ **Async Processing**: Efficient concurrent agent execution

---

## Installation Steps

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- Groq API Key ([Get one free](https://console.groq.com/))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/0xLazAI/Multi-Agent-Orchestrator-Example.git
cd Multi-Agent-Orchestrator-Example
```

### 2️⃣ Backend Setup

**Install Python dependencies:**
```bash
pip install -r requirements.txt
```

**Set up environment variables:**

Create a `.env` file in the root directory:
```
GROQ_API_KEY=your_groq_api_key_here
```

**Start the backend server:**
```bash
python api.py
```

Or use the batch file (Windows):
```bash
start_backend.bat
```

Backend will run on: `http://localhost:8000`

### 3️⃣ Frontend Setup

**Navigate to frontend directory:**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npm run dev
```

Or use the batch file from root (Windows):
```bash
cd ..
start_frontend.bat
```

Frontend will run on: `http://localhost:5173`

### 4️⃣ Access the Application

Open your browser and go to: **http://localhost:5173**

---

## Usage

### Interact with Individual Agents
1. Click on any agent card
2. Enter your query (e.g., match info, player name)
3. Get AI-powered responses from the agent

### Execute Team Workflow
1. Click "Execute Workflow" button in the header
2. Enter match information and player name
3. Watch as all 5 agents work together sequentially
4. View individual agent results and full workflow output

---

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Axios

**Backend:**
- FastAPI
- Alith Framework
- Groq AI (Llama 3.3 70B)
- Python AsyncIO

---

## Project Structure

```
Multi-Agent-Orchestrator-Example/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── services/     # API services
│   │   └── App.jsx       # Main app
│   └── package.json
├── agents.py             # Agent definitions
├── orchestrator.py       # Multi-agent orchestrator
├── api.py               # FastAPI backend
├── requirements.txt      # Python dependencies
└── .env                 # Environment variables
```

---

## License

MIT License - Feel free to use for your projects!
