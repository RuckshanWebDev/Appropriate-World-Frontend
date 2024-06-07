import React, { useEffect, useRef, useState } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    convertFromHTML,
    ContentState,
} from "draft-js";
import Toolbar from "./Toolbar";
import "./DraftEditor.css";

const DraftEditor = ({ setEditorData, data = null }) => {
    const [editorState, setEditorState] = useState(
        data
            ? EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(data).contentBlocks,
                    convertFromHTML(data).entityMap
                )
            )
            : EditorState.createEmpty()
    );
    const editor = useRef(null);

    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    const styleMap = {
        CODE: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
        HIGHLIGHT: {
            backgroundColor: "#F7A5F7",
        },
        UPPERCASE: {
            textTransform: "uppercase",
        },
        LOWERCASE: {
            textTransform: "lowercase",
        },
        CODEBLOCK: {
            fontFamily: '"fira-code", "monospace"',
            fontSize: "inherit",
            background: "#ffeff0",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "0.3rem 0.5rem",
            borderRadius: "0.2rem",
        },
        SUPERSCRIPT: {
            verticalAlign: "super",
            fontSize: "80%",
        },
        SUBSCRIPT: {
            verticalAlign: "sub",
            fontSize: "80%",
        },
    };

    const myBlockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
            case "blockQuote":
                return "superFancyBlockquote";
            case "leftAlign":
                return "leftAlign";
            case "rightAlign":
                return "rightAlign";
            case "centerAlign":
                return "centerAlign";
            case "justifyAlign":
                return "justifyAlign";
            default:
                return null;
        }
    };

    useEffect(() => {
        if (data) {
            const blocksFromHTML = convertFromHTML(data);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            const editorData = EditorState.createWithContent(contentState);
            setEditorState(editorData);
        }

        focusEditor();
    }, [data]);

    return (
        <div className="editor-wrapper" onClick={focusEditor}>
            {editorState && (
                <>
                    <Toolbar editorState={editorState} setEditorState={setEditorState} />
                    <div className="editor-container">
                        <Editor
                            ref={editor}
                            placeholder="Write Here"
                            handleKeyCommand={handleKeyCommand}
                            editorState={editorState}
                            customStyleMap={styleMap}
                            blockStyleFn={myBlockStyleFn}
                            onChange={(newState) => {
                                const contentState = newState.getCurrentContent();
                                setEditorData(contentState);
                                setEditorState(newState);
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default DraftEditor;
