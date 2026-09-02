import { useState } from 'react';
import { RichEditor } from '@/components/RichEditor';
import { Button } from '@/components/ui/button';

/**
 * Example usage of the RichEditor component
 * 
 * Features:
 * - Bold, Italic, Code formatting
 * - Heading levels (H1, H2, H3)
 * - Bullet and numbered lists
 * - Link insertion
 * - Image insertion
 * - Undo/Redo functionality
 */

export function RichEditorExample() {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = () => {
    setSubmitted(content);
    console.log('Content:', content);
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Rich Text Editor</h2>
        
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Enter your content:</label>
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Enter your rich text content here..."
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit Content
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="space-y-2 rounded-lg border border-border bg-muted p-4">
          <h3 className="font-semibold">Preview:</h3>
          <div
            className="prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: submitted }}
          />
          <details className="mt-4">
            <summary className="cursor-pointer font-medium">View HTML</summary>
            <pre className="mt-2 overflow-auto rounded bg-muted-foreground/10 p-2 text-xs">
              {submitted}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default RichEditorExample;
