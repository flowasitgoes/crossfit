# AI 工作規則

規格是唯一權威：`docs/prd/PRD.md` 與 `docs/sdd/`。不要用現有程式反推需求。

流程：PRD／SDD → task → Spec Check → 方案審閱 → 實作 → 測試 → 結果回報 → 合併。

## 硬限制

- 未經人確認，不改 PRD／SDD，不加欄位，不加流程。
- 未寫進規格的功能不做。MVP 只做本次 Acceptance Criteria。不為之後的優先級預留欄位或抽象。
- 不實作登入、Callable、Trigger。部署用的 Security Rules 維持全部拒絕，不得 `firebase deploy`。
- Functions 不可 import `shared/frontend` 或 `@app/frontend/*`。
- Web build 不可輸出到 `www/`。`www/` 不可手寫、不可 commit。
- `apps/web` 不可 import `@ionic/*` 或 `@capacitor/*`。
- 不新增對外 REST／`/api`。
- `tasks/*.md` 不可 commit。只有 `tasks/README.md` 進版控。
- 只有改執行邏輯才建 task。只改 PRD、SDD、README 不必建 task。
- 一個 branch 一個可獨立 review 的功能。merge 後先更新 main，再開下一支。

## 實作前 Spec Check

範圍、Acceptance Criteria、資料模型、API、UI 狀態、測試都要對得上該次 task。缺任何一項就停，回報缺什麼，不要自己補需求。

## 完成回報

```text
實作結果：
測試：
未覆蓋風險：
規格不一致：
```

## 之後課表發文格式（catalog 內容）

人用類似下面的結構貼課表時，開發者改 `shared/frontend/data-access/src/catalog.ts`（與必要的 media／測試）。不要另開欄位或流程。

### 發文結構

1. 標題列：日期（推成 `trainedOn` `YYYY-MM-DD`）＋課名／來源（可選）
2. **Warm-Up 暖身**：輪數寫進 `scheme`；每項有名稱（中英）、次數（`frequencyAndTime`）、動作解說（寫進動作庫 `cues`）
3. **Movement Prep 動作準備**：每項名稱（中英）、次數、動作解說（`cues`）
4. **WOD／正式訓練**：計時或回合寫進區塊 `title`／`scheme`；每項名稱、每輪次數；左右次數（如 5/5、6/6）寫進該項 `note`
5. **學員筆記**（可選）：寫進 `athleteNote`，用 `- ` 開頭的清單，畫面區塊標題為「學員筆記」
6. 教練注意／未標重量等說明：寫進該區塊 `scheme` 或日記欄位；沒寫就不顯示

### 寫入約定

- 新堂課 `id`：`session-YYYY-MM-DD`；`title` 與既有堂一致時用 `Work-Out Diary`（課程列表旁才會顯示）
- 暖身／WOD 項目名稱用發文原文；動作準備用中英並列
- 動作庫缺的動作就新增；有 RepDB 對應圖才放 `/media/repdb/` 並走既有署名；沒圖就 `imagePath: null`
- 空白日記欄位維持空字串；左右分配、重量以發文為準，不自行補數字
- 補單元測試鎖住該日區塊標題、次數與左右 note
