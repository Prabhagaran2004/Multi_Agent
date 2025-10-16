# ⚡ Quick Start - Cricket Team AI

## 🎯 30-Second Setup

### 1. Install Dependencies
```bash
# Python backend
pip install -r requirements.txt

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Configure API Key
```bash
# Create .env file
copy .env.example .env

# Edit .env and add your GROQ API key
GROQ_API_KEY=your_key_here
```

### 3. Start Application
```bash
# Option A: Use batch files (Windows)
start_backend.bat
start_frontend.bat

# Option B: Manual start
# Terminal 1:
python api.py

# Terminal 2:
cd frontend
npm run dev
```

### 4. Open Browser
```
http://localhost:3000
```

## 🎨 What You'll See

### Main Dashboard
- 5 agent cards with unique colors and icons
- Animated background with floating particles
- "Execute Workflow" button in header

### Try This First

**Individual Agent:**
1. Click "Head Coach" card (blue)
2. Enter: "Match against Mumbai Indians"
3. Click "Execute Agent"
4. View AI strategy response

**Complete Workflow:**
1. Click "Execute Workflow" button
2. Match Info: "IPL Final"
3. Player Name: "Virat Kohli"
4. Click "Execute Complete Workflow"
5. Watch all 5 agents work together

## 🏏 Agent Guide

| Icon | Agent | Input Required | Example |
|------|-------|----------------|---------|
| 🎯 | Head Coach | Match info | "Match vs CSK" |
| 🏏 | Batting Coach | Player name | "Virat Kohli" |
| ⚡ | Bowling Coach | Player name | "Bumrah" |
| 💪 | Head Physio | Player name | "Rohit Sharma" |
| 👤 | Player | Player name | "MS Dhoni" |

## ⚠️ Common Issues

**Can't connect to backend?**
→ Make sure `python api.py` is running

**Agents not loading?**
→ Check `.env` has valid GROQ_API_KEY

**Port already in use?**
→ Change port in `vite.config.js` or `api.py`

## 📚 Full Documentation

- `COMPLETE_SETUP_GUIDE.md` - Complete setup & usage
- `UI_SETUP.md` - UI features & customization
- `FRONTEND_README.md` - Frontend development

## 🎉 You're Ready!

Your Cricket Team AI is now running with a beautiful UI! 🏏🤖
