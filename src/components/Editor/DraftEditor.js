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
        // EditorState.createWithContent(
        //     convertFromRaw({
        //         blocks: [
        //             {
        //                 key: "3eesq",
        //                 text: "",
        //                 type: "unstyled",
        //                 depth: 0,
        //                 inlineStyleRanges: [
        //                     {
        //                         offset: 19,
        //                         length: 6,
        //                         style: "BOLD",
        //                     },
        //                     {
        //                         offset: 25,
        //                         length: 5,
        //                         style: "ITALIC",
        //                     },
        //                     {
        //                         offset: 30,
        //                         length: 8,
        //                         style: "UNDERLINE",
        //                     },
        //                 ],
        //                 entityRanges: [],
        //                 data: {},
        //             },
        //             // {
        //             //     key: "9adb5",
        //             //     text: "Tell us a story!",
        //             //     type: "header-one",
        //             //     depth: 0,
        //             //     inlineStyleRanges: [],
        //             //     entityRanges: [],
        //             //     data: {},
        //             // },
        //         ],
        //         entityMap: {},
        //     })
        // )
    );
    const editor = useRef(null);

    // let state, initialState = false

    // if (data) {
    //     const blocksFromHTML = convertFromHTML(data);
    //     state = ContentState.createFromBlockArray(
    //         blocksFromHTML.contentBlocks,
    //         blocksFromHTML.entityMap,
    //     );
    // }

    // if (initialState) {
    //     initialState = false
    //     console.log(state);
    // }

    const focusEditor = () => {
        editor.current.focus();
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    // FOR INLINE STYLES
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
            borderRadius: " 0.2rem",
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

    // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
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
                break;
        }
    };

    useEffect(() => {

        if (data) {
            const blocksFromHTML = convertFromHTML(data);
            let state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );
            const editorData = EditorState.createWithContent(state)
            console.log("STATE", state, editorData);
            setEditorState(editorData)
        }

        focusEditor();

    }, [data])

    return (
        <div className="editor-wrapper" onClick={focusEditor}>
            <Toolbar editorState={editorState} setEditorState={setEditorState} />
            <div className="editor-container">
                <Editor
                    ref={editor}
                    placeholder="Write Here"
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={styleMap}
                    blockStyleFn={myBlockStyleFn}
                    onChange={(editorState) => {
                        const contentState = editorState.getCurrentContent();
                        setEditorData(contentState)
                        setEditorState(editorState);
                    }}
                />
            </div>
        </div>
    );
};

export default DraftEditor;
