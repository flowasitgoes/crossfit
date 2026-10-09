# CrossFit Diary

一位教練、一位選手的上課日記。產品範圍在 `docs/prd/PRD.md`，技術邊界在 `docs/sdd/`。

這一版只呈現上課內容。老師和學生不在畫面上新增或編輯。內容寫在 `shared/frontend/data-access/src/catalog.ts`。

三張動作插畫來自 RepDB 免費版，只放在 App 裡使用。Exercise data by [RepDB](https://repdb.co)。

## 指令

```bash
npm run start:web       # http://localhost:4200
npm run start:mobile    # http://localhost:4202
npm run build:web       # dist/apps/web/browser
npm run build:mobile    # www/
npm run cap:sync
npm run test:unit
npm run test:web
npm run test:mobile
npm run check
```

實機：

```bash
npx ng build mobile --configuration=development && npx cap sync android
npx cap open android
```

改畫面只改 `apps/mobile/src`，再 build 與 sync。不要手改 `www/`、`android/` 裡的網頁產物，或 `ios/` 裡的網頁產物。

Firebase emulator 的專案 id 是 `demo-crossfit`。還沒有正式 Firebase 專案，不要 deploy。
# crossfit
# crossfit
