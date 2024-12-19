# EarnUSDC on Base

Web3アプリケーション：USDCの預金と紹介システム

.
├── package.json
├── next.config.js
├── tailwind.config.js
├── src/
    ├── pages/
    │   ├── _app.tsx        # wagmi設定とグローバルスタイル
    │   ├── index.tsx       # メインページ（デポジット機能含む）
    │   └── dashboard.tsx   # 管理者ダッシュボード
    ├── store.ts           # zustandストア（admin含む）
    └── config.ts          # 定数とABI
