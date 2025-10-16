"""
Cricket Team Multi-Agent Orchestrator
Manages and coordinates cricket team agents asynchronously
"""

import asyncio
import uuid
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime

from agents import AGENT_REGISTRY

class TaskStatus(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class WorkflowType(Enum):
    SEQUENTIAL = "sequential"
    PARALLEL = "parallel"

@dataclass
class Task:
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    agent_type: str = ""
    method: str = ""
    args: Dict[str, Any] = field(default_factory=dict)
    status: TaskStatus = TaskStatus.PENDING
    result: Any = None
    error: Optional[str] = None
    dependencies: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None

@dataclass
class Workflow:
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    workflow_type: WorkflowType = WorkflowType.SEQUENTIAL
    tasks: List[Task] = field(default_factory=list)
    status: TaskStatus = TaskStatus.PENDING
    results: Dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None

# ----------------------------
# Orchestrator Class
# ----------------------------
class MultiAgentOrchestrator:
    def __init__(self):
        self.agents: Dict[str, Any] = {}
        self.workflows: Dict[str, Workflow] = {}

    # Initialize cricket agents
    def initialize_agents(self, agent_types: List[str] = None):
        if agent_types is None:
            agent_types = list(AGENT_REGISTRY.keys())

        for agent_type in agent_types:
            if agent_type in AGENT_REGISTRY:
                self.agents[agent_type] = AGENT_REGISTRY[agent_type]()
                print(f"✅ Initialized {agent_type} agent")
            else:
                print(f"❌ Unknown agent type: {agent_type}")

    # Create workflow
    def create_workflow(self, name: str, workflow_type: WorkflowType = WorkflowType.SEQUENTIAL) -> str:
        workflow = Workflow(name=name, workflow_type=workflow_type)
        self.workflows[workflow.id] = workflow
        print(f"📋 Created workflow: {name} (ID: {workflow.id})")
        return workflow.id

    # Add task to workflow
    def add_task_to_workflow(self, workflow_id: str, agent_type: str, method: str,
                             args: Dict[str, Any] = None, dependencies: List[str] = None) -> str:
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        if args is None:
            args = {}
        if dependencies is None:
            dependencies = []

        task = Task(agent_type=agent_type, method=method, args=args, dependencies=dependencies)
        self.workflows[workflow_id].tasks.append(task)
        print(f"➕ Added task {task.id} ({agent_type}.{method})")
        return task.id

    # Check dependencies
    def _dependencies_met(self, task: Task, completed_tasks: set) -> bool:
        return all(dep in completed_tasks for dep in task.dependencies)

    # Execute single task
    async def execute_task(self, task: Task) -> Any:
        try:
            task.status = TaskStatus.IN_PROGRESS
            if task.agent_type not in self.agents:
                raise ValueError(f"Agent {task.agent_type} not initialized")

            agent = self.agents[task.agent_type]
            method = getattr(agent, task.method)
            result = await method(**task.args)

            task.result = result
            task.status = TaskStatus.COMPLETED
            task.completed_at = datetime.now()
            print(f"✅ Task {task.id} completed: {task.agent_type}.{task.method}")
            return result
        except Exception as e:
            task.status = TaskStatus.FAILED
            task.error = str(e)
            task.completed_at = datetime.now()
            print(f"❌ Task {task.id} failed: {e}")
            raise

    # Execute sequential workflow
    async def execute_workflow_sequential(self, workflow_id: str) -> Dict[str, Any]:
        workflow = self.workflows[workflow_id]
        workflow.status = TaskStatus.IN_PROGRESS
        results = {}
        completed_tasks = set()

        while len(completed_tasks) < len(workflow.tasks):
            executed_this_round = False
            for task in workflow.tasks:
                if task.status == TaskStatus.PENDING and self._dependencies_met(task, completed_tasks):
                    result = await self.execute_task(task)
                    results[task.id] = result
                    completed_tasks.add(task.id)
                    executed_this_round = True
            if not executed_this_round:
                break

        workflow.status = TaskStatus.COMPLETED
        workflow.completed_at = datetime.now()
        workflow.results = results
        return results

    # Execute workflow
    async def execute_workflow(self, workflow_id: str) -> Dict[str, Any]:
        if workflow_id not in self.workflows:
            raise ValueError(f"Workflow {workflow_id} not found")
        workflow = self.workflows[workflow_id]

        if workflow.workflow_type == WorkflowType.SEQUENTIAL:
            return await self.execute_workflow_sequential(workflow_id)
        else:
            raise NotImplementedError("Only sequential workflow is implemented for cricket agents")

    # List workflows
    def list_workflows(self):
        return [
            {"id": w.id, "name": w.name, "status": w.status.value, "task_count": len(w.tasks)}
            for w in self.workflows.values()
        ]

    # List agents
    def list_agents(self):
        return list(self.agents.keys())
