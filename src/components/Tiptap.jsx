import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './Tiptap.css'
import Toolbar from './Toolbar'
import Image from '@tiptap/extension-image'

const Tiptap = () => {
    const editor = useEditor({
extensions: [StarterKit,Image],
    content: 'Hola mundo',
  })

const editorState = useEditorState({
   editor,
   selector: (ctx) => {
        return {
            isBold: ctx.editor.isActive('bold'),
            isItalic: ctx.editor.isActive('italic'),
            isUnderline: ctx.editor.isActive('underline'),
            isCodeBlock: ctx.editor.isActive('codeBlock'),
            isHeading1: ctx.editor.isActive('heading', {level: 1}),
            isHeading2: ctx.editor.isActive('heading', {level: 2}),
            isHeading3: ctx.editor.isActive('heading', {level: 3}),
            isParagraph: ctx.editor.isActive('paragraph'),
            isOrderedList: ctx.editor.isActive('orderedList'),
            isBulletList: ctx.editor.isActive('bulletList'),
            isImage: ctx.editor.isActive('image'),
            isLink: ctx.editor.isActive('link'),
        }
   } 
})  

const comandos = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    toggleH1: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    toggleH2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    toggleH3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    toggleParagraph: () => editor.commands.setParagraph(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBulletList: () => editor.commands.toggleBulletList(),
    loadimage: () => {
        const url = window.prompt('URL');
        editor.chain().focus().setImage({src: url}).run();
    },
    loadURL: () => {
        const previous_url = editor.getAttributes('link').href;
        const url = window.prompt('URL',previous_url);
        editor.chain().focus().setLink({href: url}).run();
    }

}
   return (
  <>
    <Toolbar comandos={comandos} editorState={editorState}  />
    <main>
        <div className="prose">
        <EditorContent editor={editor}></EditorContent>
        </div>
    </main>
  </>
)
}

export default Tiptap;