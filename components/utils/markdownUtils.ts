// Utility functions for loading markdown content
export const loadMarkdownContent = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      return await response.text();
    }
    return '';
  } catch (error) {
    console.error('Error loading markdown:', error);
    return '';
  }
};

export const parseMarkdownSections = (content: string) => {
  const sections = content.split(/^#{1,2}\s+/m).filter(Boolean);
  return sections.map((section, index) => {
    const lines = section.trim().split('\n');
    const title = lines[0] || `Section ${index + 1}`;
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
};

export const extractCodeBlocks = (content: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    });
  }
  
  return blocks;
};
