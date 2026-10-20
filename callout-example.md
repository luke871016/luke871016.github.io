---
title: "Callout Shortcode 使用範例"
date: 2025-01-27
tags: ["範例", "shortcode"]
categories: ["教學"]
---

這篇文章展示如何使用 callout shortcode 創建各種類型的提示框，以及雙語頁面如何用 `lang` 參數讓 callout 跟著語言切換顯示。

## 基本用法

### 資訊提示 (Info)

{{< callout type="info" title="重要提醒" >}}
這是一個資訊提示框，用於顯示重要的資訊或說明。
{{< /callout >}}

### 警告提醒 (Warning)

{{< callout type="warning" title="注意事項" >}}
這是一個警告提醒框，用於提醒讀者需要注意的重要事項。
{{< /callout >}}

### 成功訊息 (Success)

{{< callout type="success" title="操作成功" >}}
這是一個成功訊息框，用於顯示操作成功的訊息。
{{< /callout >}}

### 錯誤訊息 (Error)

{{< callout type="error" title="錯誤提醒" >}}
這是一個錯誤訊息框，用於顯示錯誤或問題的提醒。
{{< /callout >}}

### 筆記說明 (Note)

{{< callout type="note" title="補充說明" >}}
這是一個筆記說明框，用於提供額外的說明或註解。
{{< /callout >}}

## 不帶標題的 Callout

{{< callout type="info" >}}
這是一個沒有標題的資訊提示框，內容會直接顯示。
{{< /callout >}}

## 雙語頁面：用 `lang` 參數讓 Callout 跟著語言切換

在雙語（華／台）頁面中，**不要**把 callout 巢狀放在 `{{< mandarin >}}` 或 `{{< taiwanese >}}` 裡面，否則會造成 HTML 渲染錯誤。  
改為使用**獨立的 callout 區塊**，並加上 `lang="mandarin"` 或 `lang="taiwanese"`，callout 就會依頁面語言切換一併顯示或隱藏。

### 華語專用 Callout（切到華語時才顯示）

{{< callout type="note" title="重點筆記（華語）" lang="mandarin" >}}
這是只有切換到華語時才會顯示的 callout，內容用華語撰寫。
{{< /callout >}}

### 台語專用 Callout（切到台語時才顯示）

{{< callout type="note" title="重點筆記（台語）" lang="taiwanese" >}}
這是只有切換到台語時才會顯示的 callout，內容用台語撰寫。
{{< /callout >}}

### 書寫範例（雙語頁面）

同一則重點，若華語、台語各有一段說明，請寫成**兩個獨立的 callout**，分別指定 `lang="mandarin"` 與 `lang="taiwanese"`：

```markdown
{{< callout type="note" title="重點筆記" lang="mandarin" >}}
- 編碼、字型與輸入法是三大角色
- 編碼定義符號編號；字型決定顯示圖形；輸入法把想打的字轉成編碼
{{< /callout >}}

{{< callout type="note" title="重點筆記" lang="taiwanese" >}}
- 編碼、字型佮輸入法是三大角色
- 編碼負責定義符號編號；字型負責顯示圖；輸入法共想欲打的字轉做編碼
{{< /callout >}}
```

## 包含 Markdown 內容

{{< callout type="warning" title="程式碼範例" >}}
以下是一個程式碼範例：

```javascript
function hello() {
  console.log("Hello, World!");
}
```

**注意**：這段程式碼僅供參考。
{{< /callout >}}

## 使用方式總整理

在 Markdown 中可使用以下語法：

```markdown
{{< callout type="info" title="標題" >}}
內容
{{< /callout >}}
```

**參數說明：**

| 參數 | 必填 | 說明 |
|------|------|------|
| `type` | 否 | 預設 `info`。可選：`info`、`warning`、`success`、`error`、`note` |
| `title` | 否 | callout 標題，不填則只顯示內容 |
| `lang` | 否 | 雙語頁面專用。設為 `mandarin` 或 `taiwanese` 時，callout 會隨語言切換顯示／隱藏；不設則兩種語言都會顯示 |

**類型對應：**

- `info`: 資訊提示（藍色）
- `warning`: 警告提醒（黃色）
- `success`: 成功訊息（綠色）
- `error`: 錯誤訊息（紅色）
- `note`: 筆記說明（灰色）

**重要提醒：** 雙語頁面請勿將 `{{< callout >}}` 巢狀放在 `{{< mandarin >}}`／`{{< taiwanese >}}` 內，應改為獨立的 callout 區塊並使用 `lang` 參數，才能正確渲染並跟著語言切換。
