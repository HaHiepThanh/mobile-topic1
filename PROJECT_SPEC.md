# Project Specification - topic1

## 1. Project Goal

This is a simple social feed app built with React Native + Expo. The app focuses on:

- Displaying a feed of posts
- Navigating from a post to a user profile
- Creating a new post through a dedicated screen
- Organizing code into screens, components, and data for maintainability

The app uses static mock data only. There is no backend.

## 2. Tech Stack and Core Dependencies

- React 19.1.0
- React Native 0.81.5
- Expo SDK 54
- React Navigation
  - @react-navigation/native
  - @react-navigation/bottom-tabs
  - @react-navigation/native-stack

Available scripts:

- `npm start` -> Expo dev server
- `npm run android` -> run on Android
- `npm run ios` -> run on iOS
- `npm run web` -> run on Web

## 3. Current Folder Structure

```text
topic1/
  App.js
  index.js
  app.json
  instruction.md
  PROJECT_SPEC.md
  newRequest.md
  assets/
    adaptive-icon.png
    beach.jpg
    favicon.png
    icon.png
    reactnative.png
    splash-icon.png
    thanh.jpg
  src/
    components/
      ActionButton.js
      Avatar.js
      PostItem.js
    data/
      mockData.js
    screens/
      CreatePostScreen.js
      FeedScreen.js
      ProfileScreen.js
      SettingsScreen.js
```

## 4. Application Architecture

### 4.1 Entry Point

- `index.js` calls Expo `registerRootComponent(App)`.
- `App.js` only contains navigation setup. It does not render screen UI directly.

### 4.2 Navigation Structure

Navigation is organized into two layers in `App.js`:

1. Native Stack (`HomeStackNavigator`)
   - `Feed` -> `FeedScreen`
   - `Profile` -> `ProfileScreen`
2. Bottom Tab Navigator (`Tab.Navigator`)
   - `HomeTab` -> hosts the stack above
   - `CreatePostTab` -> `CreatePostScreen`
   - `ProfileTab` -> directly opens `ProfileScreen` with `initialParams`

Important notes:

- `defaultProfileUser` is taken from the post with `id = '1'` in `MOCK_POSTS`.
- `HomeTab` is the initial tab.
- `SettingsScreen` exists in the repo but is not currently attached to any tab.

### 4.3 Data Flow Overview

1. `FeedScreen` imports `MOCK_POSTS` from `src/data/mockData.js`
2. `FlatList` renders each post with `PostItem`
3. When the user taps the avatar or username in `PostItem`, `onUserPress(user)` is called
4. `FeedScreen` handles that callback and navigates with `navigation.navigate('Profile', { user })`
5. `ProfileScreen` reads `route.params.user` and renders the selected user
6. If `ProfileScreen` has no params, it falls back to the user from post id `1`
7. `CreatePostScreen` is a UI mock for now; it does not yet submit or upload anything

## 5. Data Contract

Source file: `src/data/mockData.js`

Each post follows this shape:

```js
{
  id: string,
  created_at: string, // ISO date-time
  user: {
    id: string,
    username: string,
    avatar: string | number, // remote URL or local require(...)
    bio: string,
    location: string
  },
  post_image: string | number, // remote URL or local require(...)
  caption: string,
  likes: number,
  comments: number,
  shares: number
}
```

Important notes:

- `avatar` and `post_image` support both local assets (`require(...)`) and remote URL strings.
- `Avatar` and `PostItem` already handle the correct `Image` source conversion.
- Post id `1` is used as the default profile fallback user.

## 6. Screen Responsibilities

### 6.1 FeedScreen (`src/screens/FeedScreen.js`)

Responsibilities:

- Render the feed using `FlatList`
- Navigate to a profile when the user interacts with a post user area

Implementation details:

- `data={MOCK_POSTS}`
- `keyExtractor={(item) => item.id}`
- `renderItem` returns `PostItem`
- `onUserPress` maps to `navigation.navigate('Profile', { user })`

### 6.2 ProfileScreen (`src/screens/ProfileScreen.js`)

Responsibilities:

- Render user details: avatar, username, bio, and location
- Render a simple static stats section

Fallback behavior:

- If `route.params.user` is missing, the screen uses the user from post id `1`
- If post id `1` is unavailable for some reason, the screen falls back to:
  - username: `unknown`
  - bio: `No bio available.`
  - avatar: `https://i.pravatar.cc/150?u=default`
  - location: `Unknown`

### 6.3 CreatePostScreen (`src/screens/CreatePostScreen.js`)

Responsibilities:

- Render a create-post UI
- Reuse `Avatar`
- Display the current user info (username and bio)

UI elements:

- User card with avatar and user info
- Placeholder block for `Post Image`
- Multiline `TextInput` for `Caption`
- `Post` button

Current status:

- UI only
- No submit logic yet
- No real image picker yet

### 6.4 SettingsScreen (`src/screens/SettingsScreen.js`)

Responsibilities:

- Placeholder/demo UI screen
- Displays the text `Màn hình Cài đặt (UI Giả)`

Current status:

- Exists in the codebase
- Not attached to the active tab navigator

## 7. Component Responsibilities

### 7.1 Avatar (`src/components/Avatar.js`)

Props:

- `uri`: string | local asset module
- `size` (optional, default = 50)
- `onPress` (optional)

Behavior:

- If `uri` is a string, it uses `{ uri }`
- Otherwise, it treats the value as a local image source
- The avatar is always rounded with `borderRadius = size / 2`
- If `onPress` is missing, the `TouchableOpacity` is disabled

### 7.2 ActionButton (`src/components/ActionButton.js`)

Props:

- `title`: label text
- `icon`: emoji or icon character
- `onPress`: callback

Behavior:

- Renders a horizontal icon + label button
- Current like/comment/share handlers in `PostItem` are no-op callbacks

### 7.3 PostItem (`src/components/PostItem.js`)

Props:

- `post`: post object
- `onUserPress`: callback receiving a user object

Responsibilities:

- Render user header (avatar + username)
- Render post image
- Render like/comment/share action buttons
- Render caption and summary metadata

Interaction:

- Tap avatar or username -> call `onUserPress(post.user)`

## 8. Styling and UI Rules

- Use `StyleSheet.create` consistently across the app.
- Feed background is a very light gray (`#fafafa`), post cards are white.
- Profile header is centered and the stats row is horizontal.
- Create Post screen uses a card-style layout with a clear placeholder and button.

## 9. Asset Strategy

- Local images are used for some avatars/posts to support offline demo behavior.
- Remote image URLs are used for the rest of the mock data to make the feed visually varied.
- Local assets are stored in `assets/`.

## 10. Current Limitations and Follow-up Notes

1. `created_at` is not rendered in the UI yet.
2. Action buttons do not have business logic yet; they are UI only.
3. `CreatePostScreen` does not yet support submit or image upload.
4. `ProfileTab` currently opens the profile for the default user from post id `1`.
5. `SettingsScreen` is present but not attached to the active tab bar.
6. There is no centralized state management yet (Redux/Zustand/Context); all data is static.
7. There are no tests yet (unit/integration/e2e).

## 11. Suggested Next Steps for Another Agent

If extending this project, follow this order:

1. Decide the final UX for Create Post: image selection, caption input, and submit flow.
2. Add actual logic for like/comment/share, either locally or through shared state.
3. Normalize the user/post model and add TypeScript types if the project is migrated.
4. Format and display `created_at` in `PostItem`.
5. Reintroduce `SettingsScreen` into the tab bar if a third tab is needed.
6. Add tests for:
   - Feed rendering
   - Profile navigation from avatar/username taps
   - Profile fallback behavior
   - Create Post tab visibility

## 12. One-Sentence Summary

This is a simple React Native social feed app with nested navigation (Bottom Tab + Native Stack), a create-post screen, static mock data, and clearly separated screens/components ready for extension.# Project Specification - topic1

## 1. Muc tieu du an

Day la ung dung social feed don gian bang React Native + Expo, tap trung vao:

- Hien thi danh sach bai dang (feed)
- Dieu huong tu bai dang sang profile cua user
- Tao bai dang moi bang man hinh Create Post
- To chuc code theo cau truc component/screen/data de de bao tri

Ung dung duoc viet theo kieu mock data, khong co backend.

## 2. Tech Stack va phu thuoc chinh

- React 19.1.0
- React Native 0.81.5
- Expo SDK 54
- React Navigation
  - @react-navigation/native
  - @react-navigation/bottom-tabs
  - @react-navigation/native-stack

Scripts chay:

- `npm start` -> Expo dev server
- `npm run android` -> chay tren Android
- `npm run ios` -> chay tren iOS
- `npm run web` -> chay tren Web

## 3. Cau truc thu muc hien tai

```text
topic1/
  App.js
  index.js
  app.json
  instruction.md
  PROJECT_SPEC.md
  newRequest.md
  assets/
    adaptive-icon.png
    beach.jpg
    favicon.png
    icon.png
    reactnative.png
    splash-icon.png
    thanh.jpg
  src/
    components/
      ActionButton.js
      Avatar.js
      PostItem.js
    data/
      mockData.js
    screens/
      CreatePostScreen.js
      FeedScreen.js
      ProfileScreen.js
      SettingsScreen.js
```

## 4. Kien truc ung dung

### 4.1 Entry point

- `index.js` goi `registerRootComponent(App)` cua Expo.
- `App.js` chi chiu trach nhiem cung cap NavigationContainer va cau hinh navigator, khong chua UI truc tiep.

### 4.2 Navigation

Navigation duoc to chuc 2 tang trong `App.js`:

1. Native Stack (`HomeStackNavigator`)
   - Screen `Feed` -> `FeedScreen`
   - Screen `Profile` -> `ProfileScreen`
2. Bottom Tab (`Tab.Navigator`)
   - Tab `HomeTab` -> chua toan bo stack ben tren
   - Tab `CreatePostTab` -> `CreatePostScreen`
   - Tab `ProfileTab` -> mo truc tiep `ProfileScreen` voi `initialParams`

Ghi chu:

- `defaultProfileUser` duoc lay tu post co `id = '1'` trong `MOCK_POSTS`.
- `HomeTab` la tab mac dinh.
- `SettingsScreen` co ton tai nhung hien tai khong duoc gan vao tab nao.

### 4.3 Data flow tong quan

1. `FeedScreen` import `MOCK_POSTS` tu `src/data/mockData.js`
2. `FlatList` render tung phan tu bang component `PostItem`
3. Khi bam avatar/username trong `PostItem`, callback `onUserPress(user)` duoc goi
4. `FeedScreen` nhan callback va navigate: `navigation.navigate('Profile', { user })`
5. `ProfileScreen` doc user tu `route.params.user` de hien thi
6. Neu `ProfileScreen` khong co params, screen fallback ve user cua post id `1`
7. `CreatePostScreen` hien tai la UI mock de tao bai dang moi, chua co submit logic

## 5. Hop dong du lieu (Data Contract)

Nguon du lieu: `src/data/mockData.js`

Kieu du lieu moi post:

```js
{
  id: string,
  created_at: string, // ISO date-time
  user: {
    id: string,
    username: string,
    avatar: string | number, // remote URL hoac local require(...)
    bio: string,
    location: string
  },
  post_image: string | number, // remote URL hoac local require(...)
  caption: string,
  likes: number,
  comments: number,
  shares: number
}
```

Ghi chu quan trong:

- `avatar` va `post_image` ho tro ca local asset (`require(...)`) va remote URL string.
- `Avatar` va `PostItem` da xu ly source phu hop cho `Image`.
- Post co id `1` la post mac dinh duoc dung lam profile fallback.

## 6. Mo ta man hinh

### 6.1 FeedScreen (`src/screens/FeedScreen.js`)

Trach nhiem:

- Hien thi feed bang `FlatList`
- Dieu huong sang profile khi user interaction

Chi tiet implementation:

- `data={MOCK_POSTS}`
- `keyExtractor={(item) => item.id}`
- `renderItem` -> `PostItem`
- `onUserPress` trong `PostItem` duoc map sang `navigate('Profile', { user })`

### 6.2 ProfileScreen (`src/screens/ProfileScreen.js`)

Trach nhiem:

- Hien thi thong tin user (avatar, username, bio, location)
- Hien thi block thong ke stat (dang la gia)

Fallback behavior:

- Neu khong co `route.params.user`, screen lay user cua post `id = '1'` lam mac dinh
- Neu vi ly do nao do khong co post id `1`, screen tu tao user fallback:
  - username: `unknown`
  - bio: `No bio available.`
  - avatar: `https://i.pravatar.cc/150?u=default`
  - location: `Unknown`

### 6.3 CreatePostScreen (`src/screens/CreatePostScreen.js`)

Trach nhiem:

- Hien thi UI tao bai dang moi
- Tai su dung `Avatar`
- Hien thi thong tin user hien tai (username + bio)

Thanh phan UI:

- Khu vuc `Avatar` + thong tin user
- Placeholder cho `Anh bai dang`
- `TextInput` multiline cho `Noi dung`
- Nut `Dang bai`

Trang thai hien tai:

- Moi chi la UI mock, chua co state submit/validate/upload
- Chua co chuc nang chon anh thuc su

### 6.4 SettingsScreen (`src/screens/SettingsScreen.js`)

Trach nhiem:

- Man hinh placeholder cho muc dich UI demo
- Hien thi 1 dong text `Man hinh Cai dat (UI Gia)`

Trang thai hien tai:

- Ton tai trong codebase nhung khong duoc gan vao Bottom Tab

## 7. Mo ta components

### 7.1 Avatar (`src/components/Avatar.js`)

Props:

- `uri`: string | local asset module
- `size` (optional, default = 50)
- `onPress` (optional)

Hanh vi:

- Neu `uri` la string -> dung `{ uri }`
- Neu khong -> coi la local source
- Tu dong bo tron avatar theo `borderRadius = size / 2`
- Neu khong co `onPress` -> `TouchableOpacity` bi disable

### 7.2 ActionButton (`src/components/ActionButton.js`)

Props:

- `title`: text hien thi
- `icon`: ky tu emoji/icon
- `onPress`: callback

Hanh vi:

- Render button dang ngang icon + label
- Hien tai callback cho like/comment/share trong `PostItem` dang la no-op (`() => {}`)

### 7.3 PostItem (`src/components/PostItem.js`)

Props:

- `post`: object bai dang
- `onUserPress`: function nhan `user`

Trach nhiem:

- Render header user (avatar + username)
- Render anh post
- Render 3 nut action (like/comment/share)
- Render caption + thong tin tong hop comment/share

Interaction:

- Bam avatar/username -> goi `onUserPress(post.user)`

## 8. Quy uoc style va UI

- Su dung `StyleSheet.create` nhat quan trong toan bo code.
- Mau nen feed: xam rat nhe (`#fafafa`), card post nen trang.
- Profile co bo cuc center cho header, thong ke theo hang ngang.
- CreatePostScreen co layout card, placeholder va button ro rang de test UI nhanh.

## 9. Asset strategy

- Local image duoc dung cho mot so avatar/post de demo offline mot phan.
- Remote image URL duoc dung cho phan lon mock data de tao do da dang.
- Asset local nam trong thu muc `assets/`.

## 10. Cac diem can luu y khi phat trien tiep

1. `created_at` hien tai chua duoc hien thi tren UI.
2. Action buttons chua co business logic (chi la UI).
3. `CreatePostScreen` chua co submit logic va chua ket noi upload anh.
4. `ProfileTab` dang mo profile cua user mac dinh (post id 1), chua phan tach concept `my profile`.
5. `SettingsScreen` ton tai nhung chua gan vao Bottom Tab.
6. Chua co state management tap trung (Redux/Zustand/Context), du lieu dang static.
7. Chua co test (unit/integration/e2e).

## 11. Huong dan nhanh cho agent tiep theo

Neu can mo rong project, nen di theo thu tu:

1. Chot lai UX cho Create Post: chon anh that, nhap caption, submit.
2. Them logic cho like/comment/share (state local hoac global).
3. Chuan hoa model user/post va tach type (neu chuyen sang TypeScript).
4. Bo sung format thoi gian tu `created_at` o `PostItem`.
5. Co the dua `SettingsScreen` tro lai Bottom Tab neu can 3 tab khac nhau.
6. Them test cho:
   - Render feed
   - Navigate profile khi bam avatar/username
   - Fallback user tren profile
   - Hien thi CreatePostScreen trong tab navigator

## 12. Tom tat 1 cau

Project la mot ung dung social feed React Native don gian, co nested navigation (Bottom Tab + Native Stack), them man hinh Create Post, du lieu mock tinh, va da tach ro screen/component de san sang mo rong tinh nang.# Project Specification - topic1

## 1. Muc tieu du an

Day la ung dung social feed don gian bang React Native + Expo, tap trung vao:

- Hien thi danh sach bai dang (feed)
- Dieu huong tu bai dang sang profile cua user
- To chuc code theo cau truc component/screen/data de de bao tri

Ung dung duoc viet theo kieu mock data (khong co backend).

## 2. Tech Stack va phu thuoc chinh

- React 19.1.0
- React Native 0.81.5
- Expo SDK 54
- React Navigation:
  - @react-navigation/native
  - @react-navigation/bottom-tabs
  - @react-navigation/native-stack

Scripts chay:

- `npm start` -> Expo dev server
- `npm run android` -> chay tren Android
- `npm run ios` -> chay tren iOS
- `npm run web` -> chay tren Web

## 3. Cau truc thu muc

```text
topic1/
  App.js
  index.js
  app.json
  instruction.md
  PROJECT_SPEC.md
  assets/
    adaptive-icon.png
    beach.jpg
    favicon.png
    icon.png
    reactnative.png
    splash-icon.png
    thanh.jpg
  src/
    components/
      ActionButton.js
      Avatar.js
      PostItem.js
    data/
      mockData.js
    screens/
      FeedScreen.js
      ProfileScreen.js
      SettingsScreen.js
```

## 4. Kien truc ung dung

### 4.1 Entry point

- `index.js` goi `registerRootComponent(App)` cua Expo.

### 4.2 Navigation

Navigation duoc to chuc 2 tang trong `App.js`:

1. Native Stack (`HomeStackNavigator`)
   - Screen `Feed` -> `FeedScreen`
   - Screen `Profile` -> `ProfileScreen`
2. Bottom Tab (`Tab.Navigator`)
   - Tab `HomeTab` -> chua toan bo stack ben tren
   - Tab `ProfileTab` -> mo truc tiep `ProfileScreen` voi `initialParams`

Ghi chu:

- `defaultProfileUser` duoc lay tu post co `id = '1'` trong `MOCK_POSTS`.
- `SettingsScreen` co ton tai nhung hien tai chua duoc gan vao tab nao.

### 4.3 Data flow tong quan

1. `FeedScreen` import `MOCK_POSTS` tu `src/data/mockData.js`
2. `FlatList` render tung phan tu bang component `PostItem`
3. Khi bam avatar/username trong `PostItem`, callback `onUserPress(user)` duoc goi
4. `FeedScreen` nhan callback va navigate: `navigation.navigate('Profile', { user })`
5. `ProfileScreen` doc user tu `route.params.user` de hien thi

## 5. Hop dong du lieu (Data Contract)

Nguon du lieu: `src/data/mockData.js`

Kieu du lieu moi post:

```js
{
  id: string,
  created_at: string, // ISO date-time
  user: {
    id: string,
    username: string,
    avatar: string | number, // remote URL hoac local require(...)
    bio: string,
    location: string
  },
  post_image: string | number, // remote URL hoac local require(...)
  caption: string,
  likes: number,
  comments: number,
  shares: number
}
```

Ghi chu quan trong:

- `avatar` va `post_image` ho tro ca local asset (kieu module id tu `require`) va remote URL string.
- `Avatar` va `PostItem` da xu ly convert source phu hop cho `Image`.

## 6. Mo ta man hinh

### 6.1 FeedScreen (`src/screens/FeedScreen.js`)

Trach nhiem:

- Hien thi feed bang `FlatList`
- Nhiet tinh nang dieu huong sang profile khi user interaction

Chi tiet implementation:

- `data={MOCK_POSTS}`
- `keyExtractor={(item) => item.id}`
- `renderItem` -> `PostItem`
- `onUserPress` trong `PostItem` duoc map sang `navigate('Profile', { user })`

### 6.2 ProfileScreen (`src/screens/ProfileScreen.js`)

Trach nhiem:

- Hien thi thong tin user (avatar, username, bio, location)
- Hien thi block thong ke stat (dang la gia)

Fallback behavior:

- Neu khong co `route.params.user`, screen tu tao user mac dinh:
  - username: `unknown`
  - bio: `No bio available.`
  - avatar: `https://i.pravatar.cc/150?u=default`
  - location: `Unknown`

### 6.3 SettingsScreen (`src/screens/SettingsScreen.js`)

Trach nhiem:

- Man hinh placeholder cho muc dich UI demo
- Hien thi 1 dong text "Man hinh Cai dat (UI Gia)"

Trang thai hien tai:

- Chua duoc su dung trong navigation hien tai.

## 7. Mo ta components

### 7.1 Avatar (`src/components/Avatar.js`)

Props:

- `uri`: string | local asset module
- `size` (optional, default = 50)
- `onPress` (optional)

Hanh vi:

- Neu `uri` la string -> dung `{ uri }`
- Neu khong -> coi la local source
- Tu dong bo tron avatar theo `borderRadius = size / 2`
- Neu khong co `onPress` -> `TouchableOpacity` bi disable

### 7.2 ActionButton (`src/components/ActionButton.js`)

Props:

- `title`: text hien thi
- `icon`: ky tu emoji/icon
- `onPress`: callback

Hanh vi:

- Render button dang ngang icon + label
- Hien tai callback cho like/comment/share trong `PostItem` dang la no-op (`() => {}`)

### 7.3 PostItem (`src/components/PostItem.js`)

Props:

- `post`: object bai dang
- `onUserPress`: function nhan `user`

Trach nhiem:

- Render header user (avatar + username)
- Render anh post
- Render 3 nut action (like/comment/share)
- Render caption + thong tin tong hop comment/share

Interaction:

- Bam avatar/username -> goi `onUserPress(post.user)`

## 8. Quy uoc style va UI

- Su dung `StyleSheet.create` nhat quan trong toan bo code.
- Mau nen feed: xam rat nhe (`#fafafa`), card post nen trang.
- Profile co bo cuc center cho header, thong ke theo hang ngang.

## 9. Asset strategy

- Local image duoc dung cho mot so avatar/post de demo offline mot phan.
- Remote image URL duoc dung cho phan lon mock data de tao do da dang.
- Asset local nam trong thu muc `assets/`.

## 10. Cac diem can luu y khi phat trien tiep

1. `created_at` hien tai chua duoc hien thi tren UI.
2. Action buttons chua co business logic (chi la UI).
3. `ProfileTab` dang mo profile cua user mac dinh (post id 1), chua phan tach concept "my profile".
4. `SettingsScreen` ton tai nhung chua gan vao Bottom Tab.
5. Chua co state management tap trung (Redux/Zustand/Context), du lieu dang static.
6. Chua co test (unit/integration/e2e).

## 11. Huong dan nhanh cho agent tiep theo

Neu can mo rong project, nen di theo thu tu:

1. Chot lai yeu cau UX cho tab thu 2 (`Profile` hay `Settings`).
2. Them logic cho like/comment/share (state local hoac global).
3. Chuan hoa model user/post va tach type (neu chuyen sang TypeScript).
4. Bo sung format thoi gian tu `created_at` o `PostItem`.
5. Them test cho:
   - Render feed
   - Navigate profile khi bam avatar/username
   - Fallback user tren profile

## 12. Tom tat 1 cau

Project la mot ung dung social feed React Native don gian, co nested navigation (Bottom Tab + Native Stack), du lieu mock tinh, va da tach ro screen/component de san sang mo rong tinh nang.