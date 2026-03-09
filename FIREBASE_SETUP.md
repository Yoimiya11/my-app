# Firebase 配置指南 - 智能数字衣橱

## 1. 创建 Firebase 项目

1. 打开 [Firebase Console](https://console.firebase.google.com/)
2. 点击「添加项目」→ 输入项目名称 → 完成创建

## 2. 注册 Web 应用

在项目首页点击 `</>` 图标 → 输入应用名称 → 获取 `firebaseConfig` 配置信息

## 3. 填入配置

打开 `src/firebase.js`，将 `YOUR_*` 全部替换为你从 Firebase Console 复制的值：

```js
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxxx.firebaseapp.com",
  projectId: "xxxx",
  storageBucket: "xxxx.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx"
};
```

## 4. 开启 Firebase 服务

在 Firebase Console 左侧菜单依次开启：

| 服务 | 路径 | 设置 |
|------|------|------|
| **Authentication** | 构建 → Authentication → Sign-in method | 启用「电子邮件/密码」 |
| **Firestore** | 构建 → Firestore Database → 创建数据库 | 选择测试模式 |
| **Storage** | 构建 → Storage → 开始使用 | 选择测试模式 |

## 5. Firestore 安全规则（正式上线前替换）

在 Firebase Console → Firestore → 规则 中粘贴：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wardrobeItems/{item} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 6. Storage 安全规则

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /wardrobes/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. 启动开发服务器

```bash
cd d:\Test\digital-wardrobe
npm run dev
```

访问 http://localhost:5173 即可使用！
