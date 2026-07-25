# ScreenTrove Legal Website

ScreenTrove（简体中文名“屏藏”）的隐私政策与使用条款网站。它是一个无依赖的静态站点，可直接发布到
GitHub Pages。

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

`https://mrdynasty.github.io/alc/`

## 更新法律信息

页面正文位于：

- `site/privacy/index.html`
- `site/terms/index.html`

当前版本基于“无账号、无广告、无分析追踪、不出售数据”的假设。若 App 的实际
功能不同，应在发布前同步更新相关说明。
