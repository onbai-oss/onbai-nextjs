import Tippy from '@tippyjs/react'
import { EditorContent } from '@tiptap/react'
import React from 'react'
import styled from 'styled-components'
import { colors } from 'tailwindcss/defaultTheme'

interface Props {}
interface ButtonToolbarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const ButtonToolbarStyle = styled.button`
  margin: 2px 2px;
  /* border: 1px solid black; */
  border-radius: 2px;
  padding: 2px 5px;
  color: ${(props: any) => (props.isActive ? colors?.blue[500] : 'inherit')};
  &:hover {
    background: ${colors?.gray[200]};
  }
  &:disabled {
    color: ${colors?.gray[300]};
  }
`

const ButtonToolbar = React.forwardRef<HTMLButtonElement, ButtonToolbarProps>(
  (props, ref) => (
    <ButtonToolbarStyle {...props} ref={ref}>
      {props.children}
    </ButtonToolbarStyle>
  )
)

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <div
        className={`tiptap-custom-menubar rounded-t border-l-2 border-r-2 border-t-2 border-solid border-gray-300`}
      >
        <section className={`flex flex-wrap justify-between`}>
          <section>
            <Tippy content="Bold">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                isActive={editor.isActive('bold')}
              >
                <i className="bi bi-type-bold"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Italic">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                isActive={editor.isActive('italic')}
              >
                <i className="bi bi-type-italic"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Strike">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
                isActive={editor.isActive('strike')}
              >
                <i className="bi bi-type-strikethrough"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Align left">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                className={
                  editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
                }
                isActive={editor.isActive({ textAlign: 'left' })}
              >
                <i className="bi bi-text-left"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Align center">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                className={
                  editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
                }
                isActive={editor.isActive({ textAlign: 'center' })}
              >
                <i className="bi bi-text-center"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Align right">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                className={
                  editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
                }
                isActive={editor.isActive({ textAlign: 'right' })}
              >
                <i className="bi bi-text-right"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Paragraph">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
                isActive={editor.isActive('paragraph')}
              >
                <i className="bi bi-text-paragraph"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Heading 1">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
                }
                isActive={editor.isActive('heading', { level: 1 })}
              >
                <i className="bi bi-type-h1"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Heading 2">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
                }
                isActive={editor.isActive('heading', { level: 2 })}
              >
                <i className="bi bi-type-h2"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Heading 3">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
                }
                isActive={editor.isActive('heading', { level: 3 })}
              >
                <i className="bi bi-type-h3"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Code">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
                isActive={editor.isActive('codeBlock')}
              >
                <i className="bi bi-code"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Bullet list">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                isActive={editor.isActive('bulletList')}
              >
                <i className="bi bi-list-ul"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Ordered list">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                isActive={editor.isActive('orderedList')}
              >
                <i className="bi bi-list-ol"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Block quote">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                isActive={editor.isActive('blockquote')}
              >
                <i className="bi bi-blockquote-left"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Add image">
              <ButtonToolbar
                type="button"
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setImage({
                      src: global.prompt('URL image:', '/quiz3.png'),
                    })
                    .run()
                }
              >
                <i className="bi bi-image"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Hard break">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().setHardBreak().run()}
              >
                <i className="bi bi-arrow-bar-down"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Clear formart">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
              >
                <i className="bi bi-eraser"></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Default style">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().clearNodes().run()}
              >
                <i className="bi bi-eraser-fill"></i>
              </ButtonToolbar>
            </Tippy>
          </section>

          <section>
            <Tippy content="Undo">
              <ButtonToolbar
                type="button"
                title="Undo"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <i className={`bi bi-arrow-left-short`}></i>
              </ButtonToolbar>
            </Tippy>

            <Tippy content="Redo">
              <ButtonToolbar
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <i className={`bi bi-arrow-right-short`}></i>
              </ButtonToolbar>
            </Tippy>
          </section>
        </section>
      </div>
    </>
  )
}

const Tiptap = (props) => {
  const editor = props.editor ? props.editor : null

  return (
    <>
      <div className={`relative `}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} {...props} />
        <div
          className={`absolute  px-1 rounded bottom-1 right-1 bg-white text-xs text-gray-400 hover:text-gray-600`}
        >
          {editor?.getCharacterCount()} characters
        </div>
      </div>
    </>
  )
}

export default Tiptap
