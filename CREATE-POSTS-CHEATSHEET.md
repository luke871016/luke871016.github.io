# Hugo 文章創建 Cheat Sheet

## 快速創建文章指令

### 1. 創建華語文章

```bash
# 基本指令
hugo new blog/your-post-title.md --kind mandarin

# 範例
hugo new blog/my-mandarin-article.md --kind mandarin
```

### 2. 創建台語文章

```bash
# 基本指令
hugo new blog/your-post-title.md --kind taiwanese

# 範例
hugo new blog/my-taiwanese-article.md --kind taiwanese
```

### 3. 創建雙語對照文章

```bash
# 基本指令
hugo new blog/your-post-title.md --kind bilingual

# 範例
hugo new blog/my-bilingual-article.md --kind bilingual
```

## 文章類型說明

| 類型 | 指令參數 | 語言設定 | 適用場景 |
|------|----------|----------|----------|
| 華語文章 | `--kind mandarin` | `language_type = "mandarin"` | 純華語內容 |
| 台語文章 | `--kind taiwanese` | `language_type = "taiwanese"` | 純台語內容 |
| 雙語對照 | `--kind bilingual` | `language_type = "bilingual"` | 華台雙語對照 |

## 常用工作流程

### 1. 創建新文章
```bash
# 選擇文章類型並創建
hugo new blog/your-title.md --kind [mandarin|taiwanese|bilingual]
```

### 2. 編輯文章
```bash
# 使用您喜歡的編輯器
code content/blog/your-title.md
# 或
vim content/blog/your-title.md
```

### 3. 預覽文章
```bash
# 啟動 Hugo 伺服器（包含草稿）
hugo server --buildDrafts

# 在瀏覽器中查看
# http://localhost:1313/blog/your-title/
```

### 4. 發布文章
```bash
# 將 draft 改為 false
# 編輯 content/blog/your-title.md
# 將 draft = true 改為 draft = false
```

## 文章模板特點

### 華語文章模板 (`archetypes/mandarin.md`)
- 預設 `language_type = "mandarin"`
- 預設標籤 `["華語"]`
- 包含華語範例內容和格式

### 台語文章模板 (`archetypes/taiwanese.md`)
- 預設 `language_type = "taiwanese"`
- 預設標籤 `["台語"]`
- 包含台語範例內容和格式

### 雙語對照文章模板 (`archetypes/bilingual.md`)
- 預設 `language_type = "bilingual"`
- 預設標籤 `["雙語"]`
- 包含完整的 shortcode 範例
- 預設顯示台語內容

## 常用 Front Matter 設定

```yaml
+++
date = '2025-01-20'          # 發布日期
draft = true                 # 草稿狀態
title = '文章標題'           # 文章標題
description = '文章描述'     # SEO 描述
summary = '文章摘要'         # 列表頁摘要
toc = false                  # 目錄顯示
language_type = "mandarin"   # 語言類型
tags = ["標籤1", "標籤2"]    # 文章標籤
+++
```

## 雙語對照文章寫法

### 基本結構
```markdown
{{< mandarin >}}
華語內容
{{< /mandarin >}}

{{< taiwanese >}}
台語內容
{{< /taiwanese >}}
```

### 進階用法
```markdown
## 標題

{{< mandarin >}}
### 華語子標題
華語段落內容...
{{< /mandarin >}}

{{< taiwanese >}}
### 台語子標題
台語段落內容...
{{< /taiwanese >}}
```

## 注意事項

1. **檔案命名**：使用連字號分隔，如 `my-article-title.md`
2. **語言設定**：模板已預設正確的 `language_type`
3. **標籤設定**：模板已預設對應的語言標籤
4. **草稿狀態**：新文章預設為草稿，發布前記得改為 `draft = false`
5. **雙語對照**：記得使用 `{{< mandarin >}}` 和 `{{< taiwanese >}}` shortcode

## 快速指令參考

```bash
# 創建華語文章
hugo new blog/華語文章標題.md --kind mandarin

# 創建台語文章  
hugo new blog/台語文章標題.md --kind taiwanese

# 創建雙語文章
hugo new blog/雙語文章標題.md --kind bilingual

# 預覽網站
hugo server --buildDrafts

# 建置網站
hugo --buildDrafts
``` 