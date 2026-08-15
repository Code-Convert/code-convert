'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon, Heading2 } from 'lucide-react'
import { useState } from 'react'
import { MediaPicker } from './media-picker'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

export function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[300px] px-4 py-3 focus:outline-none'
      }
    }
  })

  const addImage = (url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  if (!editor) return null

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-white">{label}</label>}
      
      <div className="border border-white/10 rounded-md bg-white/5 overflow-hidden">
        <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'bg-white/20' : ''}`}
          >
            <Bold size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'bg-white/20' : ''}`}
          >
            <Italic size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('heading') ? 'bg-white/20' : ''}`}
          >
            <Heading2 size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'bg-white/20' : ''}`}
          >
            <List size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'bg-white/20' : ''}`}
          >
            <ListOrdered size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded hover:bg-white/10 ${editor.isActive('link') ? 'bg-white/20' : ''}`}
          >
            <Link2 size={18} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => setShowMediaPicker(true)}
            className="p-2 rounded hover:bg-white/10"
          >
            <ImageIcon size={18} className="text-white" />
          </button>
        </div>

        <EditorContent editor={editor} />
      </div>

      {showMediaPicker && (
        <MediaPicker
          onSelect={(url) => {
            addImage(url)
            setShowMediaPicker(false)
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  )
}
