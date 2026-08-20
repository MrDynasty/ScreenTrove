# ScreenTrove Website

ScreenTrove（简体中文名“屏藏”）的官方网站：产品介绍、隐私政策与使用条款。它是一个无依赖的静态站点，
包含 App Store 素材（应用图标与截图），可直接发布到 GitHub Pages。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm run dev
```

打开 `http://localhost:4173`。

## 构建与验证

```bash
npm run build
npm test
```

构建结果位于 `dist/`。

## 自动发布

推送到 `main` 分支后，`.github/workflows/pages.yml` 会自动构建并发布网站。
首次使用时，请在仓库 **Settings → Pages → Build and deployment** 中选择
**GitHub Actions**。

默认地址：

`https://mrleedynasty.com/`

## App Store

应用：屏藏：截图整理与搜索（ScreenTrove）

- App Store：https://apps.apple.com/cn/app/id6782530093
- 开发者：理朝 王

应用素材（`site/assets/`）：

- `app-icon.png` — App 图标（512×512）
- `screens/*.webp` — iPhone 与 iPad 截图（WebP 压缩）

素材来自 App Store CDN，更新应用后如需同步，请重新下载对应分辨率并覆盖同名文件。

## 页面结构

- `site/index.html` — 产品首页（图标、功能、截图画廊、下载入口）
- `site/privacy/index.html` — 隐私政策
- `site/terms/index.html` — 使用条款

当前政策与条款已涵盖“隐私优先、设备端处理”的产品定位，以及 Pro 自动续订订阅
（由 Apple App Store 处理支付，应用不收集支付卡信息）。若 App 的实际功能或
订阅方案发生变化，应在发布前同步更新相关说明。
