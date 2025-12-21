# Item Manager - CRUD Application with React Router and Firebase

A modern, fully-featured CRUD application built with React, React Router DOM, TypeScript, and Firebase Firestore. This application demonstrates a complete SPA (Single Page Application) with dynamic routing and real-time database integration.

## Features

✅ **Single Page Application (SPA)** - Navigation without page reloads
✅ **React Router DOM** - Client-side routing with dynamic routes
✅ **CRUD Operations** - Create, Read, Update, Delete items
✅ **Firebase Firestore** - Real-time cloud database
✅ **Responsive Design** - Mobile-friendly UI
✅ **TypeScript** - Type-safe code
✅ **Vite** - Lightning-fast build tool

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Navbar.css          # Navigation styles
├── pages/
│   ├── Home.tsx            # Home page
│   ├── Home.css
│   ├── CreateItem.tsx      # Create item form
│   ├── CreateItem.css
│   ├── ViewAllItems.tsx    # Display all items
│   ├── ViewAllItems.css
│   ├── ViewSingleItem.tsx  # Dynamic route - single item
│   ├── ViewSingleItem.css
│   ├── EditItem.tsx        # Edit existing item
│   └── EditItem.css
├── App.tsx                 # Main app with routing
├── App.css
├── firebase.ts             # Firebase configuration
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with features overview |
| `/create` | CreateItem | Form to create a new item |
| `/items` | ViewAllItems | Display all items in a grid |
| `/items/:id` | ViewSingleItem | View details of a single item |
| `/items/:id/edit` | EditItem | Edit an existing item |

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Go to Project Settings and copy your Firebase config
4. Replace the placeholder values in `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Setup Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in production mode** (or test mode for development)
4. Create a collection named `items`
5. The collection will automatically structure documents based on the data you add

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Usage Guide

### Creating an Item
1. Click "Create Item" in the navbar
2. Fill in the form with:
   - **Title** (required)
   - **Description** (required)
   - **Price** (required)
   - **Category** (optional)
3. Click "Create Item" to save to Firestore

### Viewing All Items
1. Click "All Items" in the navbar
2. Browse all items in a responsive grid layout
3. Each item card shows:
   - Title and category badge
   - Description preview
   - Price
   - Quick action buttons

### Viewing Single Item
1. Click "View Details" on any item card
2. See complete item information
3. Access edit functionality from this page

### Editing an Item
1. Click "Edit" button on item card or "Edit Item" on single item page
2. Modify the form fields
3. Click "Update Item" to save changes

### Deleting an Item
1. Click "Delete" button on the item card
2. Confirm the deletion
3. Item is immediately removed from Firestore and UI

## Key Technologies

- **React 19.2** - UI library
- **React Router DOM** - Client-side routing
- **Firebase 11+** - Backend and Firestore
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Responsive styling

## Data Model

Each item in Firestore has the following structure:

```typescript
{
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
```

## Features Explained

### SPA Navigation
- All navigation happens client-side using React Router
- No page reloads when switching between routes
- Fast, smooth transitions between pages

### Dynamic Routing
- `/items/:id` route uses URL parameters to fetch specific items
- Real-time data fetching from Firestore
- Reusable component for viewing and editing

### Consistent Layout
- Navbar persists across all routes
- Global CSS ensures consistent styling
- Responsive grid layouts that work on mobile and desktop

### Real-time CRUD
- **Create**: `addDoc()` adds new documents to collection
- **Read**: `getDocs()` fetches all items, `getDoc()` for single items
- **Update**: `updateDoc()` modifies existing documents
- **Delete**: `deleteDoc()` removes documents with instant UI update

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Styling

The application includes:
- **Navbar**: Sticky header with navigation links
- **Home Page**: Feature cards with CTAs
- **Item Cards**: Responsive grid with hover effects
- **Forms**: Clean, accessible form inputs
- **Colors**: Blue (#61dafb), dark gray (#282c34), green (#2e7d32) for actions

All styles use CSS Grid and Flexbox for responsive design.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### "Items not loading"
- Check Firebase config in `src/firebase.ts`
- Ensure Firestore database is created
- Check browser console for errors

### "Cannot navigate between routes"
- Make sure React Router is properly configured in `App.tsx`
- Check that all route paths are correct

### "Create/Update not working"
- Verify Firebase credentials
- Check Firestore security rules allow reads/writes
- Check that `items` collection exists

## Security Notes

⚠️ **For Production:**
- Store Firebase config in environment variables (`.env`)
- Implement proper Firestore security rules
- Add authentication for user-specific data
- Never commit `.env` files

## Future Enhancements

- User authentication (login/signup)
- Search and filter functionality
- Pagination for large datasets
- Image uploads
- Item ratings and reviews
- Export to CSV/PDF
- Dark mode toggle

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the Firestore documentation
2. Review React Router documentation
3. Check Firebase console for errors
4. Review browser console for error messages

---

**Happy Building!** 🚀
