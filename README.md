# Pixso & Pixso MCP Research — 簡報說明

> 本文件說明 `index.html` — 一份關於 **Pixso 設計工具 與 Pixso MCP** 的研究簡報。
> 中英雙語、共 39 張 slide，可右上角一鍵切換語言。

---

## 概述

| 項目 | 內容 |
|---|---|
| 主檔 | `index.html`（39 張 slide） |
| 標題 | Pixso & Pixso MCP Research — UI/UX 設計工具研究 |
| 語言 | 繁體中文 ＋ 英文雙語（`data-zh` / `data-en`，右上 **EN/中** 鈕切換）|
| 型態 | HTML ＋ 外部 `styles.css`（41K）＋ `script.js`（13K）|
| 圖示 | Font Awesome 6.5.1（CDN）|
| 建議環境 | 桌面瀏覽器（簡報首頁有提示）|
| 主題 | Pixso 是否可作為 Figma 的替代方案？含 AI 與 MCP 實測與價格分析 |

### 檔案結構
```
pixso_presentation/
├── index.html          ← 簡報主檔（39 slides）
├── styles.css          ← 所有樣式
├── script.js           ← 導覽 / 語言切換 / 燈箱等互動
├── images/             ← 23 張截圖與示範圖
└── demo/
    ├── tzuchi-60th.html       ← Pixso AI 文字轉設計成果（慈濟 60 週年 App）
    └── tzuchi-60th-draw.html  ← Pixso AI 草圖轉設計成果
```

---

## 簡報章節（39 張 slide）

依 `data-slide` 順序，以「分隔頁」分為 6 大段：

### 一、Pixso 介紹（slide 1–9）
| # | 內容 |
|---|---|
| 1 | 封面 — Pixso & Pixso MCP |
| 2 | 什麼是 Pixso？（一站式平台 / Figma 中國替代 / 即時協作）|
| 3 | Figma 介面截圖 |
| 4 | Pixso 介面截圖（「非常相似！」）|
| 5 | 核心功能 — 設計工具、匯入(.fig/.sketch/.xd/.svg)/匯出(PNG/JPG/SVG/PDF/CSS)|
| 6 | 檔案匯入：Figma → Pixso（**100% 相同**）|
| 7 | 檔案匯入：Pixso → Figma（**不建議**；改用 .sketch 中轉）|
| 8 | 使用體驗（外掛少、鋼筆工具略不同）|
| 9 | Pixso 獨特功能（離線、免費 Dev Mode、無限檔案、私有部署；基礎 AI 代幣制）|

### 二、AI 定價結構（slide 10–15）
| # | 內容 |
|---|---|
| 10 | ⚠️ 重要：AI 定價結構（分隔頁）|
| 11 | **三個獨立收費系統**：Pixso Design (pixso.net) / AI Tokens / Pixso AI (pixso.ai)|
| 12 | Pixso.net 方案權益（Starter 免費 / Pro $4–7 / Enterprise $15–18）|
| 13 | AI Tokens（pixso.net，500 初始、無法補充）vs Pixso AI（pixso.ai，$25–85/月）|
| 14 | Pixso.net 基礎 AI 截圖（AI 選單 / 文生圖 / 靈感 / 風格指南）|
| 15 | 基礎 AI 更多截圖（去背=白底非透明 ⚠️ / 提升解析度 / 元素檢查清單）|

### 三、Pixso AI 示範（slide 16–19）
| # | 內容 |
|---|---|
| 16 | Pixso AI Demo（分隔頁）|
| 17 | 文字轉設計 ＋ 程式碼（慈濟 60 週年 App，−50 點）→ 連 `demo/tzuchi-60th.html`|
| 18 | 圖片/草圖轉設計 ＋ 程式碼（−50 點）→ 連 `demo/tzuchi-60th-draw.html`|
| 19 | AI 設計生成三選項（Figma+Make / **Figma+Google Stitch 推薦** / Pixso+Pixso AI）|

### 四、Pixso MCP（slide 20–30）
| # | 內容 |
|---|---|
| 20 | Pixso MCP（分隔頁）|
| 21 | 什麼是 Pixso MCP？（Anthropic 開放標準；連接設計與 AI；IDE 整合）|
| 22 | MCP 設定指南截圖 |
| 23–29 | **設定步驟 1–6**：下載客戶端 → 啟動本地 MCP server → 設定 Claude → 複製設計連結 → 貼上並下 prompt → AI 處理 → 產出程式碼 |
| 30 | D2C vs C2D：Pixso MCP 支援 **D2C（設計→碼）**、不支援 C2D（Figma 用 html.to.design）|

### 五、真實價格比較（slide 31–34）
| # | 內容 |
|---|---|
| 31 | 真實價格比較（分隔頁）|
| 32 | 僅設計工具：Pixso vs Figma（含 Figma 官方定價截圖）|
| 33 | 含 AI 文字轉設計的實際成本（Pixso Pro+5K AI ≈ $29–43/月）|
| 34 | 成本分析：Pixso 何時較便宜？→ **僅設計便宜；要 AI 則額外付費** |

### 六、功能比較與結論（slide 35–39）
| # | 內容 |
|---|---|
| 35 | 功能比較（分隔頁）|
| 36 | 功能比較表（協作 / 自動佈局 / 離線 / 免費 Dev Mode / AI / 外掛 / 社群）|
| 37 | Pixso 優勢 vs 限制 |
| 38 | 建議：何時用 Pixso、何時留在 Figma |
| 39 | 謝謝！|

---

## 圖片資產（`images/`，23 張）

| 分類 | 檔案 |
|---|---|
| 介面 | `figma-interface.png`、`pixso-interface.png` |
| 檔案互轉 | `figma-to-pixso.png`、`pixso-to-figma.png` |
| 基礎 AI 截圖 | `pixso-net-ai.png`、`pixso-net-t2i.png`、`pixso-net-aigeneration.png`、`pixso-net-designguidelines.png`、`pixso-net-imageediting-1.png`、`pixso-net-imageediting-2.png`、`pixso-net-designelement.png` |
| Pixso AI 示範 | `pixso-ai-result.png`、`design.jpg`（草圖）、`pixso-ai-draw-result.png` |
| MCP 設定 | `guidelines.png`、`step1.png`–`step4.png`、`step5-1.png`、`step5-2.png`、`step6.png` |
| 價格 | `prices.jpg` |

所有內文圖片皆可點擊 → 全螢幕燈箱（lightbox）放大。

---

## 互動功能（`script.js`）

- **語言切換**：右上 `EN/中` 鈕，切換所有 `data-en` / `data-zh` 文字；偏好存於 `localStorage`。
- **導覽**：上一頁 / 下一頁按鈕、鍵盤方向鍵、觸控左右滑動。
- **進度條**：頂端進度條可點擊或拖曳跳頁。
- **頁碼選擇器**：點右下頁碼可輸入頁數快速跳轉。
- **全螢幕**：按 `F` 進入 / 離開全螢幕。
- **圖片燈箱**：點任一圖片放大，點背景、關閉鈕或 `Esc` 關閉。

---

## 如何開啟

直接用瀏覽器開 `index.html` 即可（無需 build）。
> 因為 `demo/` 連結與圖片使用相對路徑，建議整個資料夾一起開啟；若瀏覽器阻擋本地檔案，可用簡易伺服器：`python -m http.server` 後開 `http://localhost:8000`。

---

## 重點結論

- **設計工具**：Pixso 明顯較 Figma 便宜（免費無限檔案、免費 Dev Mode、離線），Figma → Pixso 匯入 100% 相同。
- **AI**：Pixso 基礎 AI 為代幣制且**目前無法加購**；真正的文字/圖片轉設計要另訂 **Pixso AI**（$25–85/月，獨立產品）。
- **MCP**：Pixso MCP 支援 **D2C（設計→程式碼）**，可接 Claude / Cursor / VS Code。
- **AI 生成推薦路線**：Figma ＋ Google Stitch（免費、Copy to Figma）。
