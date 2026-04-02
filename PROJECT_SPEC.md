# Project Specification - topic1

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