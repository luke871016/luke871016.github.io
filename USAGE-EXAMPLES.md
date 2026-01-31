# Hugo 多語言系統使用範例

## 快速開始

### 1. 創建華語文章

```bash
hugo new blog/my-mandarin-post.md
```

編輯 `content/blog/my-mandarin-post.md`：

```markdown
+++
date = '2025-01-20'
draft = false
title = '我的華語文章'
description = '這是一篇華語文章'
language_type = "mandarin"
tags = ["華語"]
+++

這是一篇華語文章。整篇文章都使用華語撰寫。

## 內容

這裡是文章的內容...

- 列表項目一
- 列表項目二

**粗體文字** 和 *斜體文字* 都可以正常顯示。
```

### 2. 創建台語文章

```bash
hugo new blog/my-taiwanese-post.md
```

編輯 `content/blog/my-taiwanese-post.md`：

```markdown
+++
date = '2025-01-20'
draft = false
title = '我的台語文章'
description = '這是一篇台語文章'
language_type = "taiwanese"
tags = ["台語"]
+++

這是一篇台語文章。整篇文章攏使用台語撰寫。

## 內容

遮是文章的內容...

- 列表項目一
- 列表項目二

**粗體文字** 佮 *斜體文字* 攏會當正常顯示。
```

### 3. 創建雙語對照文章

```bash
hugo new blog/my-bilingual-post.md
```

編輯 `content/blog/my-bilingual-post.md`：

```markdown
+++
date = '2025-01-20'
draft = false
title = '我的雙語對照文章'
description = '這是一篇雙語對照文章'
language_type = "bilingual"
tags = ["雙語"]
+++

這是一篇雙語對照文章。您會當使用頁面上方的語言切換按鈕來切換華語佮台語內容。

## 第一段

{{< mandarin >}}
這是第一段的華語內容。在這裡您可以寫入華語的文字。

- 華語列表項目一
- 華語列表項目二
{{< /mandarin >}}

{{< taiwanese >}}
這是第一段的台語內容。佇遮您會當寫入台語的文字。

- 台語列表項目一
- 台語列表項目二
{{< /taiwanese >}}

## 第二段

{{< mandarin >}}
這是第二段的華語內容。

**粗體文字** 和 *斜體文字* 都可以正常顯示。
{{< /mandarin >}}

{{< taiwanese >}}
這是第二段的台語內容。

**粗體文字** 佮 *斜體文字* 攏會當正常顯示。
{{< /taiwanese >}}
```

## 進階用法

### 在雙語文章中使用程式碼區塊

```markdown
## 程式碼範例

{{< mandarin >}}
以下是一個 JavaScript 函數：

```javascript
function greet(name) {
    return `你好，${name}！`;
}
```
{{< /mandarin >}}

{{< taiwanese >}}
以下是一個 JavaScript 函數：

```javascript
function greet(name) {
    return `你好，${name}！`;
}
```
{{< /taiwanese >}}
```

### 在雙語文章中使用圖片

```markdown
## 圖片範例

{{< mandarin >}}
![華語圖片說明](/images/example.jpg)
{{< /mandarin >}}

{{< taiwanese >}}
![台語圖片說明](/images/example.jpg)
{{< /taiwanese >}}
```

### 在雙語文章中使用表格

```markdown
## 表格範例

{{< mandarin >}}
| 欄位一 | 欄位二 |
|--------|--------|
| 華語內容一 | 華語內容二 |
| 華語內容三 | 華語內容四 |
{{< /mandarin >}}

{{< taiwanese >}}
| 欄位一 | 欄位二 |
|--------|--------|
| 台語內容一 | 台語內容二 |
| 台語內容三 | 台語內容四 |
{{< /taiwanese >}}
```

## 注意事項

1. **語言類型設定**：必須在 frontmatter 中正確設定 `language_type`
2. **雙語對照**：使用 `{{< mandarin >}}` 和 `{{< taiwanese >}}` shortcode 包裝內容
3. **預設顯示**：雙語對照文章預設顯示台語內容
4. **語言屬性**：shortcode 會自動設定正確的 HTML lang 屬性
5. **字體設定**：使用現有的字體設定，不額外設定字體

## 測試您的文章

建置並啟動 Hugo 伺服器：

```bash
hugo server --buildDrafts
```

然後在瀏覽器中查看您的文章，確認：
- 語言屬性正確設定
- 雙語切換按鈕正常運作
- 預設顯示台語內容 