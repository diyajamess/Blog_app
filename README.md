# Blog App

A blogging platform built with **React**, **Material-UI**, and **Draft.js**, enabling users to create, view, share, and manage blog posts. This app demonstrates the use of modern React practices, integration of rich text editing, and seamless interaction with REST APIs(Basic CRUD operations)

## Features

### 1. **Rich Text Editing**
- Integrated **Draft.js** for rich text editing.
- Supports bold, italic, and underline formatting with a customizable toolbar.
- Automatically converts content to Draft.js's raw state for storage and retrieval.

### 2. **Post Creation and Management**
- Users can create posts with a title and formatted content.
- Posts are stored in a remote database using **MockAPI** for persistence.
- Content length validation and alerts for mandatory fields.

### 3. **Post Display**
- Posts are displayed in a visually appealing card layout using **Material-UI**.
- Each card includes:
  - Post title and creation time.
  - Rich text content preview with "Show More/Less" toggle functionality.
  - Avatar dynamically generated from the post title.

### 4. **Interactive Actions**
- **Share to WhatsApp**: Share post title and content directly via WhatsApp.
- **Download as PDF**: Export post content to a PDF using **jsPDF**.
- **Delete Posts**: Remove posts with a confirmation dialog.

### 5. **State Management**
- Uses React's `useState` and `useEffect` hooks for state and lifecycle management.

### 6. **Responsive Design**
- Mobile-friendly layout using **Material-UI Grid**.
- Smooth transitions for expanding/collapsing post content.

### 7. **Error Handling**
- Handles invalid or empty content gracefully.
- Displays error messages for API failures.

## Technologies Used

- **React**: Component-based UI development.
- **Material-UI**: Pre-designed components for responsive and accessible design.
- **Draft.js**: Rich text editing and content management.
- **MockAPI**: Simulated REST API for CRUD operations.
- **jsPDF**: PDF generation from post content.
- **React Hooks**: `useState` and `useEffect` for state management.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-app.git
   cd blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
src/
|-- components/
|   |-- BlogApp.js      # Main app component
|   |-- PostForm.js     # Post creation form
|   |-- PostCard.js     # Individual post display card
|-- utils/
|   |-- LoadingSkeleton.js  # Skeleton loader for better UX
|-- App.js             # Entry point of the application
|-- index.js           # Application bootstrap
```

## How It Works

1. **Home Screen**:
   - Displays all posts fetched from MockAPI.
   - Shows a loading skeleton while data is being fetched.

2. **Creating a Post**:
   - Fill in the post title and content using the rich text editor.
   - Submit to store the post in MockAPI.

3. **Viewing a Post**:
   - Each post is displayed as a card with a preview of its content.
   - Use "Show More" to expand the full content.

4. **Managing Posts**:
   - Delete a post using the delete button.
   - Share or download a post using the respective menu options.


