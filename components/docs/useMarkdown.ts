import { useState, useEffect } from 'react';

export interface UseMarkdownResult {
  content: string;
  loading: boolean;
  error: string | null;
}

export const useMarkdown = (filePath: string): UseMarkdownResult => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (!filePath) {
        setContent('');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // GitHub Codespaces ve production için base path kontrolü
        const basePath = window.location.pathname.includes('/HasHubWeb') ? '/HasHubWeb' : '';
        const fullPath = `${basePath}${filePath}`;
        
        const response = await fetch(fullPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status} - ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setContent('# Content Not Available\n\nSorry, this content could not be loaded at the moment.\n\nPath: ' + filePath);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  return { content, loading, error };
};
