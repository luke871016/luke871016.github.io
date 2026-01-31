---
title: "Callout Shortcode 使用範例"
date: 2025-01-27
tags: ["範例", "shortcode"]
categories: ["教學"]
---

這篇文章展示如何使用新設計的 callout shortcode 來創建各種類型的提示框。

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

## 使用方式

在您的 Markdown 文件中，可以使用以下語法：

```markdown
{{< callout type="info" title="標題" >}}
內容
{{< /callout >}}
```

支援的類型：

- `info`: 資訊提示（藍色）
- `warning`: 警告提醒（黃色）
- `success`: 成功訊息（綠色）
- `error`: 錯誤訊息（紅色）
- `note`: 筆記說明（灰色）

標題是可選的，如果不提供標題，callout 將只顯示內容。
