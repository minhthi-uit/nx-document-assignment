const API_BASE_URL = 'http://localhost:4000/api';

export const api = {
  // Folders
  getFolders: async () => {
    const response = await fetch(`${API_BASE_URL}/folders`);
    if (!response.ok) throw new Error('Failed to fetch folders');
    return response.json();
  },

  createFolder: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create folder');
    return response.json();
  },

  deleteFolder: async (folderId: string) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete folder');
    return response.json();
  },

  // Documents
  getDocuments: async (folderId: string) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`);
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  createDocument: async (document: { title: string; content: string; folderId: string }) => {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document)
    });
    if (!response.ok) throw new Error('Failed to create document');
    return response.json();
  },

  deleteDocument: async (docId: string) => {
    const response = await fetch(`${API_BASE_URL}/documents/${docId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return response.json();
  },

  updateDocument: async (docId: string, content: string) => {
    const response = await fetch(`${API_BASE_URL}/documents/${docId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error('Failed to update document');
    return response.json();
  },

  getDocument: async (docId: string) => {
    const response = await fetch(`${API_BASE_URL}/documents/${docId}`);
    if (!response.ok) throw new Error('Failed to fetch document');
    return response.json();
  },

  // Search
  searchDocuments: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
    if (!response.ok) throw new Error('Failed to search documents');
    return response.json();
  },

  // History
  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },

  addToHistory: async (document: { id: string; title: string }) => {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document)
    });
    if (!response.ok) throw new Error('Failed to add to history');
    return response.json();
  }
};