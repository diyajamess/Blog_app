// BlogApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, Grid, Snackbar, Alert } from "@mui/material";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { jsPDF } from "jspdf";
import { convertFromRaw } from 'draft-js';


const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get("https://67597cc1099e3090dbe1db94.mockapi.io/api/blog/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to fetch posts", severity: "error" });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = (newPost) => {
    setLoading(true);
    axios
      .post("https://67597cc1099e3090dbe1db94.mockapi.io/api/blog/posts", newPost)
      .then(() => {
        setSnackbar({ open: true, message: "Post created!", severity: "success" });
        fetchPosts();
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to create post", severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`https://67597cc1099e3090dbe1db94.mockapi.io/api/blog/posts/${id}`)
        .then(() => {
          setSnackbar({ open: true, message: "Post deleted!", severity: "success" });
          fetchPosts();
        })
        .catch(() => {
          setSnackbar({ open: true, message: "Failed to delete post", severity: "error" });
        });
    }
  };

  const shareToWhatsApp = (post) => {
    if (!post) return;

    let plainTextContent = "Content not available";
    if (post.content) {
      try {
        let parsedContent =
          typeof post.content === "string"
            ? JSON.parse(post.content)
            : post.content;
        const contentState = convertFromRaw(parsedContent);
        plainTextContent = contentState.getPlainText();
      } catch (error) {
        console.error("Error parsing content for WhatsApp:", error);
      }
    }

    const message = `*${post.title || "Untitled"}*\n\n${plainTextContent}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const downloadPDF = (post) => {
    if (!post) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(post.title || "Untitled", 10, 10);

    let plainTextContent = "Content not available";
    if (post.content) {
      try {
        let parsedContent =
          typeof post.content === "string"
            ? JSON.parse(post.content)
            : post.content;
        const contentState = convertFromRaw(parsedContent);
        plainTextContent = contentState.getPlainText();
      } catch (error) {
        console.error("Error parsing content for PDF:", error);
      }
    }

    doc.setFontSize(12);
    const lines = doc.splitTextToSize(plainTextContent, 180);
    doc.text(lines, 10, 20);
    doc.save(`${post.title || "untitled"}.pdf`);
  };


  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog App
        </Typography>
      </Box>

      <PostForm onCreate={handleCreate} loading={loading} />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <PostCard post={post} 
                onDelete={handleDelete}
                onShare={shareToWhatsApp}
                onDownload={downloadPDF} />
            </Grid>
          ))}
        </Grid>
      )}

      {posts.length === 0 && !loading && (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 4, color: "#888" }}
        >
          No posts available.
        </Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BlogApp;