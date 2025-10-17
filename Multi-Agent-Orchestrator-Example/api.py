"""
FastAPI Backend for Cricket Team Multi-Agent System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import asyncio
from orchestrator import MultiAgentOrchestrator, WorkflowType
from agents import GenericAgent

app = FastAPI(title="Cricket Team Multi-Agent API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize orchestrator
orchestrator = MultiAgentOrchestrator()

# Store custom agents
custom_agents = {}
custom_agents_info = []

# Request models
class AgentRequest(BaseModel):
    agent_type: str
    input_data: str

class WorkflowRequest(BaseModel):
    match_info: str
    player_name: Optional[str] = "Team Players"

class CustomAgentRequest(BaseModel):
    id: str
    name: str
    role: str
    description: str
    icon: str
    color: str
    capabilities: List[str]

# Initialize agents on startup
@app.on_event("startup")
async def startup_event():
    orchestrator.initialize_agents()

# Health check
@app.get("/")
async def root():
    return {"message": "Cricket Team Multi-Agent API", "status": "running"}

# Add custom agent
@app.post("/api/agents/custom")
async def add_custom_agent(agent_request: CustomAgentRequest):
    try:
        # Create generic agent instance
        agent = GenericAgent(
            name=agent_request.name,
            role=agent_request.role,
            description=agent_request.description,
            capabilities=agent_request.capabilities
        )
        
        # Store the agent
        custom_agents[agent_request.id] = agent
        
        # Store agent info
        agent_info = {
            "id": agent_request.id,
            "name": agent_request.name,
            "role": agent_request.role,
            "description": agent_request.description,
            "icon": agent_request.icon,
            "color": agent_request.color,
            "capabilities": agent_request.capabilities,
            "type": agent_request.id
        }
        custom_agents_info.append(agent_info)
        
        return {"status": "success", "message": "Agent added successfully", "agent": agent_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Delete custom agent
@app.delete("/api/agents/custom/{agent_id}")
async def delete_custom_agent(agent_id: str):
    if agent_id in custom_agents:
        del custom_agents[agent_id]
        # Remove from info list
        global custom_agents_info
        custom_agents_info = [a for a in custom_agents_info if a["id"] != agent_id]
        return {"status": "success", "message": "Agent deleted successfully"}
    return {"status": "success", "message": "Agent not found or already deleted"}

# Get agent information
@app.get("/api/agents")
async def get_agents():
    base_agents = [
            {
                "id": "head_coach",
                "name": "Head Coach",
                "role": "Strategic Planning & Team Guidance",
                "description": "Plans strategies, analyzes opponents, and guides the team",
                "icon": "🎯",
                "color": "blue",
                "capabilities": [
                    "Match Strategy Planning",
                    "Opponent Analysis",
                    "Team Motivation",
                    "Game Plan Development"
                ]
            },
            {
                "id": "batting_coach",
                "name": "Batting Coach",
                "role": "Batting Excellence",
                "description": "Improves batting performance and provides training routines",
                "icon": "🏏",
                "color": "green",
                "capabilities": [
                    "Technique Improvement",
                    "Training Drills",
                    "Weakness Analysis",
                    "Performance Enhancement"
                ]
            },
            {
                "id": "bowling_coach",
                "name": "Bowling Coach",
                "role": "Bowling Mastery",
                "description": "Analyzes bowling performance and provides expert coaching",
                "icon": "⚡",
                "color": "red",
                "capabilities": [
                    "Performance Analysis",
                    "Skill Development",
                    "Strategy Design",
                    "Technical Guidance"
                ]
            },
            {
                "id": "head_physio",
                "name": "Head Physio",
                "role": "Health & Fitness",
                "description": "Monitors fitness, recovery and injury prevention",
                "icon": "💪",
                "color": "purple",
                "capabilities": [
                    "Fitness Assessment",
                    "Injury Prevention",
                    "Recovery Plans",
                    "Health Monitoring"
                ]
            },
            {
                "id": "player",
                "name": "Player",
                "role": "Performance Execution",
                "description": "Executes skills and reports performance feedback",
                "icon": "👤",
                "color": "orange",
                "capabilities": [
                    "Skill Execution",
                    "Performance Reporting",
                    "Training Feedback",
                    "Self-Assessment"
                ]
            }
        ]
    
    # Combine base agents with custom agents
    all_agents = base_agents + custom_agents_info
    return {"agents": all_agents}

# Execute single agent
@app.post("/api/agent/execute")
async def execute_agent(request: AgentRequest):
    try:
        agent_type = request.agent_type
        
        # Check if it's a custom agent
        if agent_type in custom_agents:
            agent = custom_agents[agent_type]
            result = await agent.execute(request.input_data)
            return {
                "agent": agent_type,
                "result": result,
                "status": "success"
            }
        
        # Check if it's a base agent
        if agent_type not in orchestrator.agents:
            raise HTTPException(status_code=404, detail=f"Agent {agent_type} not found")
        
        # Determine method based on agent type
        method_map = {
            "head_coach": ("plan_strategy", {"match_info": request.input_data}),
            "batting_coach": ("train_batting", {"player_name": request.input_data}),
            "bowling_coach": ("train_bowling", {"player_name": request.input_data}),
            "head_physio": ("provide_fitness_plan", {"player_name": request.input_data}),
            "player": ("report_performance", {"player_name": request.input_data})
        }
        
        if agent_type not in method_map:
            raise HTTPException(status_code=400, detail="Invalid agent type")
        
        method_name, args = method_map[agent_type]
        agent = orchestrator.agents[agent_type]
        method = getattr(agent, method_name)
        result = await method(**args)
        
        return {
            "agent": agent_type,
            "result": result,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Execute complete workflow
@app.post("/api/workflow/execute")
async def execute_workflow(request: WorkflowRequest):
    try:
        # Create workflow
        workflow_id = orchestrator.create_workflow(
            name="Team Preparation Workflow",
            workflow_type=WorkflowType.SEQUENTIAL
        )

        # Head Coach plans strategy
        task1 = orchestrator.add_task_to_workflow(
            workflow_id, "head_coach", "plan_strategy",
            {"match_info": request.match_info}
        )

        # Batting Coach trains player
        task2 = orchestrator.add_task_to_workflow(
            workflow_id, "batting_coach", "train_batting",
            {"player_name": request.player_name},
            dependencies=[task1]
        )

        # Bowling Coach trains player
        task3 = orchestrator.add_task_to_workflow(
            workflow_id, "bowling_coach", "train_bowling",
            {"player_name": request.player_name},
            dependencies=[task1]
        )

        # Physio provides fitness plans
        task4 = orchestrator.add_task_to_workflow(
            workflow_id, "head_physio", "provide_fitness_plan",
            {"player_name": request.player_name},
            dependencies=[task1]
        )

        # Player reports performance
        task5 = orchestrator.add_task_to_workflow(
            workflow_id, "player", "report_performance",
            {"player_name": request.player_name},
            dependencies=[task2, task3, task4]
        )

        # Execute workflow
        results = await orchestrator.execute_workflow(workflow_id)
        
        # Get workflow details
        workflow = orchestrator.workflows[workflow_id]
        
        # Format response with task details
        task_results = []
        for task in workflow.tasks:
            task_results.append({
                "id": task.id,
                "agent": task.agent_type,
                "method": task.method,
                "status": task.status.value,
                "result": task.result[:500] if task.result else None,  # Truncate for preview
                "full_result": task.result
            })
        
        return {
            "workflow_id": workflow_id,
            "status": "completed",
            "tasks": task_results,
            "message": "Workflow executed successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Get workflows
@app.get("/api/workflows")
async def get_workflows():
    workflows = orchestrator.list_workflows()
    return {"workflows": workflows}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
