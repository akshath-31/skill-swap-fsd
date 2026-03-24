const API_URL = 'http://localhost:5000/api';

export const fetchSkills = async (params: { type?: string; uid?: string; excludeUid?: string } = {}) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(`${API_URL}/skills?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  return response.json();
};

export const syncUserWithMongoDB = async (userData: any) => {
  const response = await fetch(`${API_URL}/users/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to sync user with MongoDB');
  }
  return response.json();
};

export const fetchUserFromMongoDB = async (uid: string) => {
  const response = await fetch(`${API_URL}/users/${uid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user from MongoDB');
  }
  return response.json();
};

export const fetchTransactions = async (uid: string) => {
  const response = await fetch(`${API_URL}/transactions/${uid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const createSkill = async (skill: any) => {
  const response = await fetch(`${API_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
  if (!response.ok) {
    throw new Error('Failed to create skill');
  }
  return response.json();
};

export const deleteSkill = async (id: string) => {
  const response = await fetch(`${API_URL}/skills/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete skill');
  }
  return response.json();
};
