import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
import { EditorState, convertFromRaw, Editor } from "draft-js";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const PostCard = ({ post, onDelete, onShare, onDownload }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = useState(false); // State to control expansion
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Parse and load content into EditorState
  if (post.content) {
    try {
      const parsedContent = JSON.parse(post.content); // Ensure content is parsed as Draft.js raw state
      const contentState = convertFromRaw(parsedContent);
      if (!editorState.getCurrentContent().hasText()) {
        setEditorState(EditorState.createWithContent(contentState));
      }
    } catch (error) {
      console.error("Error parsing post content:", error);
    }
  }

  // Handle toggling content visibility
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }}>
            {post.title?.split(" ")[0]?.charAt(0).toUpperCase() || "?"}
          </Avatar>
        }
        title={post.title}
        subheader={post.createdAt || "Unknown date"}
      />
      <CardContent>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            minHeight: "100px",
            backgroundColor: "#f9f9f9",
            overflowY: "auto",
            display: expanded ? "block" : "none", // Show editor only when expanded
          }}
        >
          <Editor editorState={editorState} readOnly={true} />
        </Box>
        {!expanded && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {editorState.getCurrentContent().getPlainText().substring(0, 100)}...
          </Typography>
        )}
        <Typography
          variant="caption"
          sx={{ cursor: "pointer", color: "primary.main", mt: 1 }}
          onClick={handleExpand} // Toggle expand/collapse
        >
          {expanded ? "Show less" : "Show more"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
        <IconButton aria-label="share" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <ShareIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(post.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => onShare(post)}>
          <WhatsAppIcon sx={{ mr: 1 }} />
          Share to WhatsApp
        </MenuItem>
        <MenuItem onClick={() => onDownload(post)}>
          <PictureAsPdfIcon sx={{ mr: 1 }} />
          Download as PDF
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default PostCard;
