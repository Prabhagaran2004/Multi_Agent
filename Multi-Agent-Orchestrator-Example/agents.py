"""
Cricket Team Agents using Alith framework
"""

from alith import Agent
import asyncio
from dotenv import load_dotenv
import os
load_dotenv()

Groq_key=os.getenv("GROQ_API_KEY")
class HeadCoachAgent:
    """Plans strategies, analyzes opponents, guides the team"""
    def __init__(self):
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble="""You are the Head Coach of a cricket team. Your role is to:
            - Plan strategies for matches
            - Analyze opponent teams
            - Guide and motivate players
            - Provide comprehensive game plans"""
        )

    async def plan_strategy(self, match_info: str) -> str:
        prompt = f"Plan a strategy for this match: {match_info}"
        return self.agent.prompt(prompt)

class BattingCoachAgent:
    """Improves batting performance and provides training routines"""
    def __init__(self):
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble="""You are the Batting Coach. Your role is to:
            - Improve batting techniques
            - Suggest training drills
            - Analyze batting weaknesses and strengths"""
        )

    async def train_batting(self, player_name: str) -> str:
        prompt = f"Provide batting training and improvement tips for: {player_name}"
        return self.agent.prompt(prompt)


class BowlingCoachAgent:
    """Analyzes bowling performance and provides coaching"""
    def __init__(self):
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble="""You are the Bowling Coach. Your role is to:
            - Analyze bowling performance
            - Suggest improvement drills
            - Develop bowling strategies"""
        )

    async def train_bowling(self, player_name: str) -> str:
        prompt = f"Provide bowling training and improvement tips for: {player_name}"
        return self.agent.prompt(prompt)


class HeadPhysioAgent:
    """Monitors fitness, recovery and injury prevention"""
    def __init__(self):
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble="""You are the Head Physio. Your role is to:
            - Assess player fitness
            - Suggest injury prevention and recovery plans
            - Monitor health status of players"""
        )

    async def provide_fitness_plan(self, player_name: str) -> str:
        prompt = f"Provide fitness, recovery, and injury prevention plan for: {player_name}"
        return self.agent.prompt(prompt)

class PlayerAgent:
    """Executes skills and reports performance"""
    def __init__(self):
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble="""You are a cricket player. Your role is to:
            - Execute batting, bowling, and fielding skills
            - Report personal performance
            - Provide feedback on training"""
        )

    async def report_performance(self, player_name: str) -> str:
        prompt = f"Report performance, improvements, and feedback for: {player_name}"
        return self.agent.prompt(prompt)

class GenericAgent:
    """Generic agent for custom user-created agents"""
    def __init__(self, name: str, role: str, description: str, capabilities: list):
        self.name = name
        self.role = role
        self.description = description
        self.capabilities = capabilities
        
        # Create preamble from agent details
        capabilities_text = "\n".join([f"- {cap}" for cap in capabilities])
        preamble = f"""You are {name}, a {role}. 
        
Description: {description}

Your capabilities include:
{capabilities_text}

Respond to user queries based on your role and capabilities."""
        
        self.agent = Agent(
            model="llama-3.3-70b-versatile",
            base_url="https://api.groq.com/openai/v1",
            api_key=Groq_key,
            preamble=preamble
        )
    
    async def execute(self, input_data: str) -> str:
        """Generic execution method for any input"""
        return self.agent.prompt(input_data)

# Registry for orchestrator
AGENT_REGISTRY = {
    "head_coach": HeadCoachAgent,
    "batting_coach": BattingCoachAgent,
    "bowling_coach": BowlingCoachAgent,
    "head_physio": HeadPhysioAgent,
    "player": PlayerAgent
}
