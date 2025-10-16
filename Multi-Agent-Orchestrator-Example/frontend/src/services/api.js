import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAgents = async () => {
  const response = await api.get('/api/agents');
  return response.data;
};

export const executeAgent = async (agentType, inputData) => {
  const response = await api.post('/api/agent/execute', {
    agent_type: agentType,
    input_data: inputData,
  });
  return response.data;
};

export const executeWorkflow = async (matchInfo, playerName) => {
  const response = await api.post('/api/workflow/execute', {
    match_info: matchInfo,
    player_name: playerName,
  });
  return response.data;
};

export const fetchWorkflows = async () => {
  const response = await api.get('/api/workflows');
  return response.data;
};

export default api;
