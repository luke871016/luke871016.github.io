# SEO 最佳實踐指南

## 雙語對照文章的 SEO 考量

### 目前的 SEO 改進

我們已經實作了以下 SEO 改進措施：

1. **結構化資料 (Schema.org)**
   - 為雙語文章提供明確的語言標示
   - 使用 `inLanguage` 和 `hasPart` 屬性
   - 幫助搜尋引擎理解多語言內容

2. **正確的語言屬性**
   - 主要內容區域設定正確的 `lang` 屬性
   - 每個 shortcode 包含適當的語言標示
   - 動態更新語言屬性

3. **無障礙功能 (Accessibility)**
   - 語言切換按鈕包含 `aria-pressed` 屬性
   - 適當的 `role` 和 `aria-label` 標示
   - 改善螢幕閱讀器支援

4. **語義化 HTML**
   - 使用適當的 HTML5 語義標籤
   - 清晰的內容結構

### SEO 最佳實踐建議

#### 1. 內容策略

**避免重複內容問題：**
- 確保華語和台語內容有實質差異
- 不要只是簡單翻譯，而是針對不同語言使用者調整內容
- 考慮文化差異和表達方式

**範例：**
```markdown
{{< mandarin >}}
在台灣，我們習慣使用繁體中文書寫。
{{< /mandarin >}}

{{< taiwanese >}}
佇台灣，阮攏寫台文。
{{< /taiwanese >}}
```

#### 2. 關鍵字策略

**分別針對不同語言：**
- 華語內容：使用繁體中文關鍵字
- 台語內容：使用台語常用詞彙
- 避免在兩種語言中使用完全相同的關鍵字

#### 3. 技術 SEO

**URL 結構建議：**
```
/blog/post-title/          # 雙語對照文章
/blog/post-title-zh/       # 純華語版本（可選）
/blog/post-title-tw/       # 純台語版本（可選）
```

**Meta 標籤：**
```html
<meta name="language" content="zh-hant,und-hani">
<meta name="alternate-language" content="zh-hant">
<meta name="alternate-language" content="und-hani">
```

#### 4. 替代方案

如果 SEO 問題持續存在，考慮以下替代方案：

**方案 A：分離頁面**
- 創建獨立的華語和台語頁面
- 使用 `hreflang` 標籤連結相關頁面
- 每個頁面專注於單一語言

**方案 B：子目錄結構**
```
/blog/zh/post-title/       # 華語版本
/blog/tw/post-title/       # 台語版本
```

**方案 C：參數化 URL**
```
/blog/post-title/?lang=zh  # 華語版本
/blog/post-title/?lang=tw  # 台語版本
```

### 監控和測試

#### 1. 搜尋引擎工具

- 使用 Google Search Console 監控索引狀態
- 檢查是否有重複內容警告
- 監控各語言版本的搜尋表現

#### 2. 測試工具

- Google Rich Results Test：測試結構化資料
- Lighthouse：檢查 SEO 分數
- PageSpeed Insights：檢查載入速度

#### 3. 關鍵指標

- 各語言版本的搜尋排名
- 點擊率 (CTR)
- 跳出率
- 停留時間

### 建議的下一步

1. **短期**：監控目前的 SEO 表現
2. **中期**：根據數據調整內容策略
3. **長期**：考慮是否需要分離頁面結構

### 結論

目前的雙語對照設計已經包含了基本的 SEO 改進措施。建議先觀察一段時間的搜尋表現，再決定是否需要進一步的結構調整。最重要的是確保內容對使用者有價值，這才是 SEO 成功的關鍵。 