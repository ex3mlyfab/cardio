import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Heading1,
  Heading2,
  Undo,
  Redo,
  ImagePlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RichEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function RichEditor({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  className,
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm dark:prose-invert prose-headings:text-base',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5',
          'min-h-[150px] max-h-[400px] w-full resize-none overflow-auto',
          'rounded-md border border-input bg-background px-3 py-2',
          'text-sm ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          disabled && 'pointer-events-none opacity-50'
        ),
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 rounded-md border border-input bg-muted p-2">
        {/* Text Formatting */}
        <Button
          type="button"
          size="sm"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled || !editor.can().chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled || !editor.can().chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('codeBlock') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>

        {/* Headings */}
        <div className="h-8 border-l border-input" />

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        {/* Lists */}
        <div className="h-8 border-l border-input" />

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Link & Image */}
        <div className="h-8 border-l border-input" />

        <Button
          type="button"
          size="sm"
          variant={editor.isActive('link') ? 'default' : 'outline'}
          onClick={addLink}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addImage}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <ImagePlus className="h-4 w-4" />
        </Button>

        {/* History */}
        <div className="h-8 border-l border-input" />

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().chain().focus().undo().run()}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().chain().focus().redo().run()}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

export default RichEditor;
