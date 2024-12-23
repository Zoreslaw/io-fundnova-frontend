import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import * as Icons from "./Icons";
import "./styles.css";
import { useCreateProjectContext } from "../../contexts/CreateProjectContext";
import { uploadImageToDrive } from "../../utils/imagesApi";



type StoryEditorProps = {
    content: string;
    onUpdate: (markdown: string) => void;
  };

const StoryEditor: React.FC<StoryEditorProps> = ({ content, onUpdate }) => {

  const { state, setState } = useCreateProjectContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          style: "max-width: 100%; height: auto; display: block;",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          target: "_blank",
        },
      }),
    ],
    content: state.story,
    onUpdate: ({ editor }) => {
        onUpdate(editor.getHTML());
    },
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.startsWith("image/")) {
              const file = item.getAsFile();
              if (file) {
                uploadImageToDrive(file)
                  .then((url) => {
                    editor?.chain().focus().setImage({ src: url }).run();
                  })
                  .catch((error) => {
                    console.error("Failed to upload image:", error);
                  });
              }
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  const handleAddImage = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const url = await uploadImageToDrive(file);
          editor?.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };

    fileInput.click();
  };

  const addLink = useCallback(() => {
    const url = prompt("Enter the URL");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addHeading = (level: any) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  const toggleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const alignText = (alignment: "left" | "center" | "right") => {
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="story-editor">
      <div className="editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Icons.Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Icons.Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <Icons.Underline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Icons.Strikethrough />
        </button>
        <button onClick={addLink}>
          <Icons.Link />
        </button>
        <button onClick={handleAddImage}>
          <Icons.Image />
        </button>
        <button onClick={() => addHeading(1)}>
          <Icons.H1 />
        </button>
        <button onClick={() => addHeading(2)}>
          <Icons.H2 />
        </button>
        <button onClick={toggleBulletList}>
          <Icons.BulletList />
        </button>
        <button onClick={toggleOrderedList}>
          <Icons.OrderedList />
        </button>
        <button onClick={() => alignText("left")}>
          <Icons.AlignLeft />
        </button>
        <button onClick={() => alignText("center")}>
          <Icons.AlignCenter />
        </button>
        <button onClick={() => alignText("right")}>
          <Icons.AlignRight />
        </button>
      </div>
      <EditorContent
        editor={editor}
       />

    </div>
  );
};

export default StoryEditor;
