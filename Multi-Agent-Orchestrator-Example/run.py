import asyncio
from orchestrator import MultiAgentOrchestrator, WorkflowType

async def main():
    print("🏏 Cricket Team Orchestrator")
    orchestrator = MultiAgentOrchestrator()
    orchestrator.initialize_agents()

    # Workflow: prepare team before match
    workflow_id = orchestrator.create_workflow(
        name="Team Preparation Workflow",
        workflow_type=WorkflowType.SEQUENTIAL
    )

    # Head Coach plans strategy
    task1 = orchestrator.add_task_to_workflow(
        workflow_id, "head_coach", "plan_strategy",
        {"match_info": "Upcoming match against Mumbai Indians"}
    )

    # Batting Coach trains player (depends on strategy)
    task2 = orchestrator.add_task_to_workflow(
        workflow_id, "batting_coach", "train_batting",
        {"player_name": "Virat Kohli"},
        dependencies=[task1]
    )

    # Bowling Coach trains player (depends on strategy)
    task3 = orchestrator.add_task_to_workflow(
        workflow_id, "bowling_coach", "train_bowling",
        {"player_name": "Jasprit Bumrah"},
        dependencies=[task1]
    )

    # Physio provides fitness plans
    task4 = orchestrator.add_task_to_workflow(
        workflow_id, "head_physio", "provide_fitness_plan",
        {"player_name": "All Players"},
        dependencies=[task1]
    )

    # Player reports performance (depends on training and fitness)
    task5 = orchestrator.add_task_to_workflow(
        workflow_id, "player", "report_performance",
        {"player_name": "All Players"},
        dependencies=[task2, task3, task4]
    )

    print("🔄 Executing workflow...")
    results = await orchestrator.execute_workflow(workflow_id)

    print("\n✅ Workflow Completed!\nResults:")
    for task_id, output in results.items():
        print(f"{task_id}: {output[:300]}...")  # truncate long text

if __name__ == "__main__":
    asyncio.run(main())
