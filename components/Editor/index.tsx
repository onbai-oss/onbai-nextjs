import React, { ReactElement } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {}

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <div className={`tiptap-custom-menubar`}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          code
        </button>
        {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button> */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          h1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          h2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          h3
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          h4
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          h5
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          h6
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          blockquote
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button> */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          redo
        </button>
      </div>
    </>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class:
          'onbai-editor prose prose-blue w-full max-w-full px-4 py-2 border-2 border-solid border-gray-600 hover:border-gray-500 rounded-md focus:outline-none focus:ring-1 ring-gray-600 ring-offset-2',
      },
    },
    content: ``,
    editable: true,
  })

  return (
    <>
      {/* <MenuBar editor={editor} /> */}
      <EditorContent editor={editor} />
    </>
  )
}

export default function Editor({}: Props): ReactElement {
  return <Tiptap />
}
