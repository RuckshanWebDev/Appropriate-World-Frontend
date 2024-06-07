import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faChevronDown,
    faChevronUp,
    faCode,
    faHighlighter,
    faItalic,
    faListOl,
    faListUl,
    faQuoteRight,
    faStrikethrough,
    faSubscript,
    faSuperscript,
    faTextWidth,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { RichUtils } from "draft-js";

const Toolbar = ({ editorState, setEditorState }) => {
    const tools = [
        {
            label: "bold",
            style: "BOLD",
            icon: <FontAwesomeIcon icon={faBold} />,
            method: "inline",
        },
        {
            label: "italic",
            style: "ITALIC",
            icon: <FontAwesomeIcon icon={faItalic} />,
            method: "inline",
        },
        {
            label: "underline",
            style: "UNDERLINE",
            icon: <FontAwesomeIcon icon={faUnderline} />,
            method: "inline",
        },
        {
            label: "highlight",
            style: "HIGHLIGHT",
            icon: <FontAwesomeIcon icon={faHighlighter} />,
            method: "inline",
        },
        {
            label: "strike-through",
            style: "STRIKETHROUGH",
            icon: <FontAwesomeIcon icon={faStrikethrough} />,
            method: "inline",
        },
        {
            label: "Superscript",
            style: "SUPERSCRIPT",
            icon: <FontAwesomeIcon icon={faSuperscript} />,
            method: "inline",
        },
        {
            label: "Subscript",
            style: "SUBSCRIPT",
            icon: <FontAwesomeIcon icon={faSubscript} />,
            method: "inline",
        },
        {
            label: "Monospace",
            style: "CODE",
            icon: <FontAwesomeIcon icon={faTextWidth} transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Blockquote",
            style: "blockQuote",
            icon: <FontAwesomeIcon icon={faQuoteRight} transform="grow-2" />,
            method: "block",
        },
        {
            label: "Unordered-List",
            style: "unordered-list-item",
            method: "block",
            icon: <FontAwesomeIcon icon={faListUl} transform="grow-6" />,
        },
        {
            label: "Ordered-List",
            style: "ordered-list-item",
            method: "block",
            icon: <FontAwesomeIcon icon={faListOl} transform="grow-6" />,
        },
        {
            label: "Code Block",
            style: "CODEBLOCK",
            icon: <FontAwesomeIcon icon={faCode} transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Uppercase",
            style: "UPPERCASE",
            icon: <FontAwesomeIcon icon={faChevronUp} transform="grow-3" />,
            method: "inline",
        },
        {
            label: "lowercase",
            style: "LOWERCASE",
            icon: <FontAwesomeIcon icon={faChevronDown} transform="grow-3" />,
            method: "inline",
        },
        {
            label: "Left",
            style: "leftAlign",
            icon: <FontAwesomeIcon icon={faAlignLeft} transform="grow-2" />,
            method: "block",
        },
        {
            label: "Center",
            style: "centerAlign",
            icon: <FontAwesomeIcon icon={faAlignCenter} transform="grow-2" />,
            method: "block",
        },
        {
            label: "Right",
            style: "rightAlign",
            icon: <FontAwesomeIcon icon={faAlignRight} transform="grow-2" />,
            method: "block",
        },
        { label: "H1", style: "header-one", method: "block" },
        { label: "H2", style: "header-two", method: "block" },
        { label: "H3", style: "header-three", method: "block" },
        { label: "H4", style: "header-four", method: "block" },
        { label: "H5", style: "header-five", method: "block" },
        { label: "H6", style: "header-six", method: "block" },
    ];

    const applyStyle = (e, style, method) => {
        e.preventDefault();
        if (!editorState) return;
        method === "block"
            ? setEditorState(RichUtils.toggleBlockType(editorState, style))
            : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const isActive = (style, method) => {
        if (!editorState) return false;
        if (method === "block") {
            const selection = editorState.getSelection();
            const blockType = editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();
            return blockType === style;
        } else {
            const currentStyle = editorState.getCurrentInlineStyle();
            return currentStyle.has(style);
        }
    };

    return (
        <div className="toolbar">
            {tools.map((tool) => (
                <button
                    type="button"
                    key={tool.label}
                    className={`toolbar-btn ${isActive(tool.style, tool.method) ? "active" : ""
                        }`}
                    onMouseDown={(e) => applyStyle(e, tool.style, tool.method)}
                >
                    {tool.icon || tool.label}
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
