import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
} from "draft-js-buttons";

import "draft-js-static-toolbar-plugin/lib/plugin.css";

const toolbarPlugin = createToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin();
const { Toolbar } = toolbarPlugin;

const plugins = [toolbarPlugin, linkifyPlugin];

const PostForm = ({ onCreate, loading }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleEditorChange = (state) => {
    setEditorState(state);
    const rawContent = convertToRaw(state.getCurrentContent());
    const createdAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setNewPost({ ...newPost, content: JSON.stringify(rawContent), createdAt });
  };

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content) {
      alert("Title and content are required.");
      return;
    }
    if (newPost.content.length > 5000) {
      alert("Content exceeds maximum allowed length.");
      return;
    }
    onCreate(newPost);
    setNewPost({ title: "", content: "" });
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mb: 4,
        backgroundColor: "#f9f9f9",
        padding: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TextField
        label="Post Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        fullWidth
        required
      />
      <Box sx={{ mb: 2 }}>
        <Toolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <Separator {...externalProps} />
            </>
          )}
        </Toolbar>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px",
          minHeight: "150px",
          backgroundColor: "#fff",
          overflowY: "auto",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins}
          placeholder="Write your content here..."
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => console.log("Draft Saved:", newPost)}
        >
          Save as Draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
