# Item Manager - CRUD Application with React Router & Firebase

A complete Single Page Application (SPA) with full CRUD functionality using React, React Router DOM, TypeScript, and Firebase Firestore.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase project (free tier available)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   - Open `src/firebase.ts`
   - Add your Firebase credentials from [Firebase Console](https://console.firebase.google.com/)

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173`

## 📋 Features

✅ **SPA Routing** - React Router DOM with 5 main routes
✅ **Dynamic Routes** - `/items/:id` pattern for single item views
✅ **Complete CRUD** - Create, Read, Update, Delete operations
✅ **Firestore Integration** - Real-time cloud database
✅ **Responsive UI** - Mobile-friendly design
✅ **Type-Safe** - Full TypeScript support
✅ **No Page Reloads** - Smooth SPA navigation

## 🗺️ Application Routes

| Path | Purpose |
|------|---------|
| `/` | Home page with feature overview |
| `/create` | Create new item form |
| `/items` | Display all items in grid |
| `/items/:id` | View single item details |
| `/items/:id/edit` | Edit existing item |

## 🎯 Functional Requirements - All Implemented

### ✅ Create
- Form with title, description, price, category
- Data validation
- Save to Firestore collection

### ✅ Read (All Items)
- Fetch all items from Firestore
- Display in responsive card grid
- Real-time updates

### ✅ Read (Single Item - Dynamic Route)
- Use `:id` parameter to fetch specific item
- Detailed view page
- Full item information display

### ✅ Update
- Pre-fill form with existing data
- Edit and save changes
- Real-time Firestore updates

### ✅ Delete
- One-click deletion with confirmation
- Immediate UI update
- Remove from Firestore

## 🎨 UI/UX Features

- **Persistent Navbar** - Navigation available on all pages
- **Responsive Grid** - Auto-adjusts for desktop, tablet, mobile
- **Loading States** - User feedback during data operations
- **Error Handling** - Clear error messages
- **Success Feedback** - Confirmations after actions
- **Modern Styling** - Clean, professional design

## 📦 Project Structure

```
src/
├── components/
│   └── Navbar.tsx          # Persistent navigation
├── pages/
│   ├── Home.tsx
│   ├── CreateItem.tsx
│   ├── ViewAllItems.tsx
│   ├── ViewSingleItem.tsx  # Dynamic route
│   └── EditItem.tsx
├── App.tsx                 # Route configuration
└── firebase.ts             # Firebase setup
```

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 🔐 Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Create a collection named `items`
4. Copy your config to `src/firebase.ts`

**Security Note:** Use environment variables for production deployment.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎓 For Detailed Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Complete installation guide
- Firebase configuration steps
- Detailed route documentation
- Data model specification
- Troubleshooting guide
- Security recommendations

## 🚀 Deployment

The app is ready to deploy on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Firebase Hosting

Simply run `npm run build` and deploy the `dist/` folder.

## 📝 License

MIT License - Feel free to use this project!

---

**Built with React 19 • TypeScript • Vite • Firebase**


```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
