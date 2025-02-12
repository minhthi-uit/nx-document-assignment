import { DocumentBase } from '@nx-document-assignment/shared-models';

export const documentBase: DocumentBase = {
  folders: [
    { id: 'javascript', name: 'JavaScript', type: 'folder' },
    { id: 'devops', name: 'DevOps', type: 'folder' },
  ],
  documents: [
    {
      id: 'js-basics',
      folderId: 'javascript',
      title: 'JavaScript Basics',
      content: `# JavaScript Basics\n\n## Variables\n\`\`\`javascript\nlet name = "Alice";\`\`\``,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'docker-basics',
      folderId: 'devops',
      title: 'Docker Basics',
      content: `# Docker Basics\n\n## Install Docker\nFollow the [Docker guide](https://docs.docker.com/).`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  history: [],
};
