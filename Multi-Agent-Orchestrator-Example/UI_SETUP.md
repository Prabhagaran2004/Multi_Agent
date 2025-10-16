# 🏏 Cricket Team AI - Complete Setup Guide

An elegant, modern UI for your Cricket Team Multi-Agent System with a beautiful glass-morphism design, smooth animations, and intuitive interactions.

## 🎨 UI Features

### ✨ **Unique Design Elements**

1. **Dynamic Background**
   - Gradient background (slate → purple → slate)
   - Animated floating particles
   - Glass-morphism effects throughout

2. **Agent Cards**
   - Each agent has a unique color scheme
   - Hover effects with scale and glow animations
   - Role-based icons and capabilities display
   - Smooth transitions and interactions

3. **Interactive Modals**
   - Full-screen agent details
   - Real-time AI response display
   - Capability showcases
   - Input validation and error handling

4. **Workflow Visualization**
   - Sequential execution tracking
   - Color-coded agent status
   - Expandable task results
   - Real-time progress updates

## 📦 Installation & Setup

### Step 1: Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Make sure your .env file has GROQ_API_KEY
# GROQ_API_KEY=your_api_key_here

# Start the backend server
python api.py
```

Backend runs at: `http://localhost:8000`

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

### Quick Start (Windows)

Double-click these batch files in order:
1. `start_backend.bat` - Starts the API server
2. `start_frontend.bat` - Starts the UI

## 🎯 Using the UI

### **Dashboard View**

When you open the app, you'll see:
- Animated header with AI status indicator
- Hero section with system statistics
- 5 beautifully designed agent cards:
  - 🎯 **Head Coach** (Blue) - Strategic Planning
  - 🏏 **Batting Coach** (Green) - Batting Excellence
  - ⚡ **Bowling Coach** (Red) - Bowling Mastery
  - 💪 **Head Physio** (Purple) - Health & Fitness
  - 👤 **Player** (Orange) - Performance Execution

### **Interacting with Individual Agents**

1. **Click** on any agent card
2. A modal opens showing:
   - Agent icon and role
   - Complete list of capabilities
   - Input form for interaction
3. **Enter** the required input:
   - Head Coach: Match info (e.g., "Match vs Mumbai Indians")
   - Other agents: Player name (e.g., "Virat Kohli")
4. **Click** "Execute Agent"
5. **View** the AI-generated response in real-time

### **Running Complete Workflows**

1. **Click** "Execute Workflow" in the header
2. A panel slides in from the bottom
3. **Fill in** the workflow parameters:
   - Match Information
   - Player Name
4. **Click** "Execute Complete Workflow"
5. **Watch** as all 5 agents execute in sequence:
   - Progress indicator for each agent
   - Real-time status updates
   - Color-coded execution states
6. **Expand** any task to see full AI response

## 🎨 Design System

### **Color Palette**

| Agent | Primary Color | Gradient |
|-------|--------------|----------|
| Head Coach | Blue | #3B82F6 → #1D4ED8 |
| Batting Coach | Green | #10B981 → #047857 |
| Bowling Coach | Red | #EF4444 → #B91C1C |
| Head Physio | Purple | #8B5CF6 → #6D28D9 |
| Player | Orange | #F97316 → #C2410C |

### **Typography**
- Font: Inter (system fallback)
- Headings: Bold, gradient text effects
- Body: Clean, high contrast for readability

### **Animations**
- Card hover: Scale + glow effect
- Page transitions: Fade + slide
- Loading states: Rotating spinners
- Background: Floating particles

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - API calls

### Backend
- **FastAPI** - REST API
- **Uvicorn** - ASGI server
- **Alith Framework** - Agent management
- **GROQ** - LLM provider

## 📱 Responsive Design

The UI is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🎭 UI Components Breakdown

### **1. Header Component**
- Logo with rotation animation
- System title and subtitle
- Workflow execution button
- AI status indicator

### **2. AgentCard Component**
Features:
- Icon with agent-specific emoji
- Name and role display
- Truncated capabilities (shows 2 + count)
- Hover effects (scale, glow, gradient overlay)
- Click handler for modal

### **3. AgentModal Component**
Features:
- Full-screen overlay
- Agent details header
- Capabilities grid
- Input form with validation
- Real-time response display
- Error handling
- Close button with rotation animation

### **4. WorkflowPanel Component**
Features:
- Sliding panel animation
- Dual input form (match + player)
- Execution button with loading state
- Task list with status indicators
- Expandable task results
- Color-coded by agent type
- Progress tracking

## 🔥 Advanced Features

### **Real-time Updates**
- Agent execution shows loading states
- Workflow tasks update progressively
- Error messages appear instantly

### **Smooth Interactions**
- All clicks have feedback
- Buttons scale on hover/tap
- Modals fade in/out smoothly
- Cards lift on hover

### **Visual Feedback**
- Success: Green checkmarks
- Loading: Spinning indicators
- Error: Red alerts with icons
- In Progress: Yellow pulsing icons

## 📊 API Integration

The UI communicates with these endpoints:

```javascript
GET  /api/agents              // Fetch all agents
POST /api/agent/execute       // Execute single agent
POST /api/workflow/execute    // Execute workflow
GET  /api/workflows           // Get workflow history
```

## 🎯 Best Practices

1. **Always start backend first** before frontend
2. **Wait for agents to load** before clicking
3. **Provide valid inputs** for better AI responses
4. **Expand workflow tasks** to see full responses
5. **Check console** for debugging if issues occur

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution:** 
- Ensure `api.py` is running
- Check port 8000 is not in use
- Verify GROQ_API_KEY in .env

### Issue: "Agents not loading"
**Solution:**
- Check browser console for errors
- Verify API endpoint is accessible
- Check CORS settings in api.py

### Issue: "Workflow stuck"
**Solution:**
- Check backend logs for errors
- Verify all agents initialized
- Ensure valid input data

## 🚀 Performance Tips

- Keep modal open for quick re-execution
- Use workflow for batch operations
- Clear results before new execution
- Close unused modals

## 🎨 Customization Guide

### Change Agent Colors
Edit `colorMap` in components:
```javascript
const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  // Add your custom colors
};
```

### Modify Animations
Adjust Framer Motion settings:
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }} // Change duration
/>
```

### Update Styling
Edit Tailwind classes or `tailwind.config.js`

## 📸 UI Screenshots Description

### Dashboard
- Dark gradient background with floating particles
- 5 agent cards in a responsive grid
- Each card has unique color and icon
- Hover effects reveal gradient overlays

### Agent Modal
- Full-screen glass effect overlay
- Colored header with agent details
- Capabilities in 2-column grid
- Input form with placeholder text
- Response area with syntax highlighting

### Workflow Panel
- Sliding panel from bottom
- Two-field input form
- Large execution button
- Collapsible task results
- Color-coded by agent type
- Status icons (pending/running/complete)

## 🎉 Enjoy!

You now have a beautiful, functional UI for your Cricket Team AI system! 

**Happy Coaching! 🏏🤖**
