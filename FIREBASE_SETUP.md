# Firebase Configuration Instructions

## 🔥 Setting Up Firebase for Your Project

Follow these steps to configure Firebase Firestore for your CRUD application.

## Step 1: Create a Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name (e.g., "item-manager")
4. Accept the default settings and click "Create project"
5. Wait for project creation to complete

## Step 2: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Navigate to **General** tab
3. Scroll down to "Your apps" section
4. Click the Web icon `</>` to register a new app
5. Enter app name (e.g., "Item Manager")
6. Click "Register app"
7. You'll see your Firebase config - copy it

## Step 3: Add Configuration to Your Project

1. Open `src/firebase.ts` in your editor
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                    // Copy from Firebase
  authDomain: "YOUR_AUTH_DOMAIN",            // Copy from Firebase
  projectId: "YOUR_PROJECT_ID",              // Copy from Firebase
  storageBucket: "YOUR_STORAGE_BUCKET",      // Copy from Firebase
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Copy from Firebase
  appId: "YOUR_APP_ID"                       // Copy from Firebase
};
```

Example (filled in):
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDx1234567890abcdefghijk",
  authDomain: "myapp.firebaseapp.com",
  projectId: "myapp-12345",
  storageBucket: "myapp-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890"
};
```

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (or test mode for development)
4. Select a location for your database (closest to you)
5. Click "Create"
6. Wait for database to be created

## Step 5: Create Items Collection

1. In Firestore Database, click **"Start collection"**
2. Enter collection ID: `items`
3. Click "Next"
4. Click "Auto ID" to create first document (or skip if you just want the collection)
5. Collection is now created!

## Step 6: Test the Connection

1. Save `src/firebase.ts`
2. Run `npm run dev`
3. Navigate to "Create Item"
4. Fill the form and submit
5. If it works, check Firestore Console to see the new item!

---

## 🔒 Security Rules (Important!)

By default, the project is in **production mode** with strict security rules.

### For Development (Testing)

If you want to allow read/write without authentication (development only):

1. Go to Firestore Database → **Rules** tab
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Allow all (development only!)
    }
  }
}
```

3. Click "Publish"

⚠️ **WARNING**: This allows ANYONE to read/write your database! Only use for development/testing.

### For Production

Implement proper security rules based on your authentication method:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /items/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 7: (Optional) Use Environment Variables

For security, store your Firebase config in environment variables:

1. Create `.env` file in root directory:
```
VITE_API_KEY=YOUR_API_KEY
VITE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_APP_ID=YOUR_APP_ID
```

2. Update `src/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
```

3. Add `.env` to `.gitignore`:
```
.env
.env.local
```

## Troubleshooting

### "Firebase configuration is missing"
- Ensure `src/firebase.ts` has valid config
- Refresh the browser

### "Permission denied" error
- Check Firestore security rules
- Use production mode rules if in development
- Verify project ID is correct

### "Items not appearing in Firestore"
- Check browser console for errors
- Verify Firestore database is created
- Ensure `items` collection exists
- Check security rules allow writes

### "Cannot connect to Firebase"
- Verify internet connection
- Check Firebase config credentials
- Ensure Firebase project is active
- Try incognito/private browser window

## Firebase Console Navigation

- **Home**: Dashboard and project overview
- **Firestore Database**: Your database and collections
- **Realtime Database**: Alternative database (not used here)
- **Storage**: File storage
- **Authentication**: User login/signup
- **Hosting**: Deploy your app
- **Project Settings**: Config and credentials

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `Error: app/invalid-api-key` | Check your Firebase config credentials |
| `Error: firestore error` | Ensure Firestore database is created |
| `Permission denied on collection` | Update Firestore security rules |
| `Items not showing in UI` | Check browser console for errors |
| `Cannot create items` | Verify items collection exists |

## Next Steps

1. ✅ Configure Firebase
2. ✅ Create Firestore database
3. ✅ Create `items` collection
4. ✅ Run `npm run dev`
5. ✅ Start using the app!

---

**Need Help?**
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

Happy coding! 🚀
