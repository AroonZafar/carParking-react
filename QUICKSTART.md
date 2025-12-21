# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Firebase
Edit `src/firebase.ts` and add your Firebase credentials:
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

Get your config from: https://console.firebase.google.com/ → Project Settings

### Step 3: Run the App
```bash
npm run dev
```

Open `http://localhost:5173` in your browser!

---

## 📋 What You Can Do

### ✅ Create Items
- Click "Create Item" in navbar
- Fill form (Title, Description, Price, Category)
- Item saved to Firestore automatically

### ✅ View All Items
- Click "All Items" in navbar
- See all items in responsive grid
- Each item shows title, price, category

### ✅ View Single Item
- Click "View Details" on any item
- See full item information
- Access edit option from here

### ✅ Edit Items
- Click "Edit" button
- Modify any field
- Changes saved to Firestore

### ✅ Delete Items
- Click "Delete" button
- Confirm deletion
- Item removed immediately

---

## 🔧 Build Commands

```bash
# Development server (auto-reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint
```

---

## 📁 Project Files

Key files to understand the app:

| File | Purpose |
|------|---------|
| `src/App.tsx` | Routes configuration |
| `src/firebase.ts` | Firebase setup |
| `src/components/Navbar.tsx` | Navigation |
| `src/pages/Home.tsx` | Home page |
| `src/pages/CreateItem.tsx` | Create form |
| `src/pages/ViewAllItems.tsx` | List all items |
| `src/pages/ViewSingleItem.tsx` | Single item detail |
| `src/pages/EditItem.tsx` | Edit form |

---

## 🔐 Firebase Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Firestore Database
- [ ] Create collection named `items`
- [ ] Copy config to `src/firebase.ts`
- [ ] Update Firestore security rules (if needed)

---

## 🎯 Testing the App

1. **Create**: Fill form → Click Create → Check Firestore Console
2. **Read All**: Navigate to All Items → Verify items display
3. **Read One**: Click View Details → Verify full details show
4. **Update**: Click Edit → Change data → Verify in Firestore
5. **Delete**: Click Delete → Confirm → Verify in Firestore

---

## 🆘 Troubleshooting

**"Items not loading?"**
- Check Firebase config in `src/firebase.ts`
- Verify Firestore database created
- Open browser DevTools → Console for errors

**"Create not working?"**
- Check Firebase credentials
- Ensure `items` collection exists
- Check Firestore security rules

**"Cannot navigate between routes?"**
- Check network connection
- Clear browser cache
- Refresh page

---

## 📚 Documentation

For detailed information, see:
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Complete setup guide
- `IMPLEMENTATION_GUIDE.md` - Technical details

---

## 🎉 Success!

Your CRUD application is ready to use!

**Next Steps:**
1. Configure Firebase ✓
2. Run `npm run dev`
3. Start creating, reading, updating, and deleting items!

Happy coding! 🚀
