/* eslint-disable sort-keys */
"use dom";
import "./styles.css";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot, EditorState, LexicalEditor } from "lexical";
import React from "react";
import { View, ViewStyle } from "react-native";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};
export default function Editor({
  setPlainText,
  setEditorState,
  style,
}: {
  setPlainText: React.Dispatch<React.SetStateAction<string>>;
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
  style?: ViewStyle;
}) {
  return (
    <View
      style={{
        marginHorizontal: -20,
        flexDirection: "column",
        height: 250,
        flex: 1,
        display: "flex",
        ...style,
      }}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <View
            style={{
              position: "sticky",
              top: 0,
              left: 0,
              zIndex: 3,
            }}
          >
            <ToolbarPlugin />
          </View>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
                aria-placeholder={placeholder}
                className="editor-input"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            ignoreHistoryMergeTagChange
            ignoreSelectionChange
            onChange={(editorState, editor, tags) => {
              editorState.read(() => {
                const root = $getRoot();
                const textContent = root.getTextContent();
                setPlainText(textContent);
              });
              setEditorState(JSON.stringify(editorState.toJSON()));
            }}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
        </div>
      </LexicalComposer>
    </View>
  );
}
