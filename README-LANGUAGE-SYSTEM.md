# Hugo 部落格多語言系統使用說明

這個 Hugo 部落格支援三種語言類型：
- 華語文章 (`mandarin`)
- 台語文章 (`taiwanese`) 
- 雙語對照文章 (`bilingual`)

## 文章類型設定

在每篇文章的 frontmatter 中設定 `language_type` 參數：

```yaml
+++
title = "文章標題"
language_type = "mandarin"  # 或 "taiwanese" 或 "bilingual"
+++
```

## 語言類型說明

### 1. 華語文章 (`mandarin`)
- 整篇文章使用華語撰寫
- 使用現有的字體設定

### 2. 台語文章 (`taiwanese`)
- 整篇文章使用台語撰寫
- 使用現有的字體設定

### 3. 雙語對照文章 (`bilingual`)
- 同時包含華語和台語內容
- 提供單一語言切換按鈕
- **預設顯示台語內容**
- 按鈕下方有說明文字提示使用者

## 雙語對照文章寫法

使用 shortcode 來分別包裝華語和台語內容，每個 shortcode 會自動設定正確的語言屬性：

```markdown
{{< mandarin >}}
這是華語內容。
{{< /mandarin >}}

{{< taiwanese >}}
這是台語內容。
{{< /taiwanese >}}
```

### 完整範例

```markdown
+++
title = "雙語對照範例"
language_type = "bilingual"
+++

## 第一段

{{< mandarin >}}
這是第一段的華語內容。
{{< /mandarin >}}

{{< taiwanese >}}
這是第一段的台語內容。
{{< /taiwanese >}}

## 第二段

{{< mandarin >}}
這是第二段的華語內容。
{{< /mandarin >}}

{{< taiwanese >}}
這是第二段的台語內容。
{{< /taiwanese >}}
```

## 語言切換按鈕

雙語對照文章會顯示一個小巧的按鈕：

- **按鈕樣式**：符合 theme 設計風格，靠左對齊
- **切換方式**：點擊單一按鈕即可切換語言
- **佈局順序**：說明文字在上，按鈕在下
- **說明文字**：
  - 台語：揤下跤佮揤鈕切換顯示語言
  - 華語：按下方的按鈕切換顯示語言
- **預設狀態**：顯示台語內容

## 語言屬性

系統會自動在 shortcode 中設定適當的語言屬性：

- `{{< mandarin >}}`：自動設定 `lang="zh-hant"`
- `{{< taiwanese >}}`：自動設定 `lang="und-hani"`

## 範例文章

查看以下範例文章了解使用方法：

1. `content/blog/mandarin-example.md` - 華語範例
2. `content/blog/taiwanese-example.md` - 台語範例  
3. `content/blog/bilingual-example.md` - 雙語對照範例

## 注意事項

1. **雙語對照文章預設顯示台語內容**
2. 語言切換按鈕只在雙語對照文章中顯示
3. 所有文章都可以被所有使用者閱讀
4. 系統不使用 Hugo 的多語言模式，而是自定義的語言切換功能
5. 使用現有的字體設定，不額外設定字體
6. 按鈕設計簡潔，不會過於突兀 