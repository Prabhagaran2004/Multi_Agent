# Cricket Team AI - Multi-Agent System UI

A beautiful, modern UI for the Cricket Team Multi-Agent orchestration system built with React, TailwindCSS, and Framer Motion.

## 🎨 Features

- **Elegant Agent Cards**: Interactive cards displaying each agent with smooth animations
- **Agent Interaction**: Click any agent to interact directly and see real-time AI responses
- **Workflow Execution**: Execute complete multi-agent workflows with visual progress tracking
- **Modern Design**: Glass-morphism effects, gradient backgrounds, and smooth animations
- **Responsive**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Python 3.8+ for backend
- GROQ API key configured in `.env`

### Backend Setup

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Start the FastAPI backend:**
```bash
python api.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The UI will open at `http://localhost:3000`

## 🎯 How to Use

### Individual Agent Interaction

1. Click on any agent card (Head Coach, Batting Coach, etc.)
2. A modal will open showing the agent's capabilities
3. Enter the required input:
   - **Head Coach**: Match information (e.g., "Match against Mumbai Indians")
   - **Batting/Bowling/Physio/Player**: Player name (e.g., "Virat Kohli")
4. Click "Execute Agent" to get AI-powered response
5. View the detailed response from the agent

### Workflow Execution

1. Click the "Execute Workflow" button in the header
2. Fill in:
   - **Match Information**: Details about the upcoming match
   - **Player Name**: The player to focus on
3. Click "Execute Complete Workflow"
4. Watch as all 5 agents work together in sequence:
   - Head Coach plans strategy
   - Batting Coach provides training (depends on strategy)
   - Bowling Coach provides training (depends on strategy)
   - Head Physio creates fitness plan (depends on strategy)
   - Player reports performance (depends on all training)
5. Expand any agent's result to see the full response

## 🎨 UI Components

### AgentCard
- Displays agent information with icon, role, and capabilities
- Hover effects with gradient overlays
- Click to open detailed modal

### AgentModal
- Full agent details and capabilities
- Interactive input form
- Real-time AI response display
- Error handling with user-friendly messages

### WorkflowPanel
- Multi-agent workflow execution
- Progress tracking for each agent
- Expandable task results
- Visual status indicators

### Header
- Navigation and branding
- Workflow trigger button
- AI status indicator

## 🎭 Design System

### Colors
- **Blue**: Head Coach (Strategy & Planning)
- **Green**: Batting Coach (Batting Excellence)
- **Red**: Bowling Coach (Bowling Mastery)
- **Purple**: Head Physio (Health & Fitness)
- **Orange**: Player (Performance)

### Effects
- Glass-morphism backgrounds
- Gradient overlays
- Smooth animations with Framer Motion
- Floating particles background
- Hover glow effects

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AgentCard.jsx       # Individual agent display
│   │   ├── AgentModal.jsx      # Agent interaction modal
│   │   ├── WorkflowPanel.jsx   # Workflow execution panel
│   │   └── Header.jsx          # App header
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main application
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 API Endpoints

- `GET /api/agents` - Fetch all agents
- `POST /api/agent/execute` - Execute single agent
- `POST /api/workflow/execute` - Execute complete workflow
- `GET /api/workflows` - Get workflow history

## 🎨 Customization

### Adding New Agents

1. Add agent configuration in `api.py`
2. Update color map in components
3. Add icon mapping in WorkflowPanel

### Changing Theme

Edit `tailwind.config.js` to modify:
- Color schemes
- Animation timings
- Spacing and sizing

### Modifying Animations

Adjust Framer Motion properties in components:
- `initial`: Starting state
- `animate`: End state
- `transition`: Animation timing

## 🐛 Troubleshooting

### Backend not connecting
- Ensure `api.py` is running on port 8000
- Check GROQ_API_KEY in `.env` file
- Verify CORS settings in FastAPI

### UI not updating
- Clear browser cache
- Restart Vite dev server
- Check browser console for errors

### Styling issues
- Run `npm install` to ensure all dependencies are installed
- Verify Tailwind is configured correctly
- Check PostCSS configuration

## 📝 License

This project is part of the Multi-Agent Orchestrator Example.

## 🤝 Contributing

Feel free to enhance the UI with:
- Additional animations
- More interactive features
- Dark/light mode toggle
- Agent performance analytics
- Workflow visualization graphs

---

**Enjoy building with Cricket Team AI! 🏏🤖**
