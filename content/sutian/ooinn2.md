+++
date = '2025-05-22T20:48:17+08:00'
draft = false
title = '台語有啥物句型？用 REGEX 語法共揣出來！'
description = '芋圓字典的REGEX語法會當揣例句，咱來揣一寡特殊的句型'
summary = '芋圓字典的REGEX語法會當揣例句，咱來揣一寡特殊的句型'
toc = false
language_type = "bilingual"
image = "/images/ooinn2-1.jpg"
tags = ["芋圓字典","REGEX","台華雙文","台文","華文"]
mandarin_title = "台語有哪些句型？用 REGEX 語法查找！"
series = ["芋圓字典"]
+++

{{< carousel >}}
/images/ooinn2-1.jpg
/images/ooinn2-2.jpg
/images/ooinn2-3.jpg
{{< /carousel >}}

{{< mandarin >}}

前面 [@taro.dict 的文章](https://www.threads.com/@taro.dict/post/DJ5xiLNPq7q)有提到，在尾端加上`$`就可以代表要找結尾，比如說輸入`菜$`可以找到各種菜

我們可以舉一反三，只要輸入`無？$`，就可以查找所有「……無？」的是非問句喔！

另外也有個符號組合很實用，可以用 `.+` 代表「任意長度的任何符號」，比如說輸入 `敢.+？$` 就可以查找所有「敢 ⋯⋯？」的問句。

如果想要限制找開頭的話，可以在語法前面加上 `^`，像是 `^敢.+？$` 就可以查找所有以「敢」開頭的問句！

## 重點整理

- `$`：找結尾
- `^`：找開頭
- `.+`：代表任意長度的任何符號
  你還想到什麼樣的應用？歡迎回應分享：）

{{< /mandarin >}}

{{< taiwanese >}}

頭前 [@taro.dict 的文章](https://www.threads.com/@taro.dict/post/DJ5xiLNPq7q)有講，佇結尾加`$`通好代表欲揣結尾，比論講拍`菜$`會揣著各種菜

咱通好進一步活用，拍`無？$`，就通揣著所有「……無？」的是非問句喔！

閣，有一个符號組合真實用，用 `.+` 代表「任意長度的任何符號」，比論講拍 `敢.+？$` 就通揣著所有「敢 ⋯⋯？」的問句。

假使欲限制揣開頭的話，就佇語法頭前拍 `^`，像 `^敢.+？$` 就通揣著所有以「敢」做開頭的問句！

## 重點整理

- `$`：揣結尾
- `^`：揣開頭
- `.+`：代表任意長度的任何符號

你閣有想著啥物應用？歡迎共我分享：）

{{< /taiwanese >}}

{{< mandarin >}}
如果你不知道什麼是 REGEX，請參考我之前寫的[REGEX 教學文章](/series/正規表達式入門)
{{< /mandarin >}}

{{< taiwanese >}}
假使你毋知啥物是 REGEX，請參考我以早寫的[REGEX 教學文章](/series/正規表達式入門)
{{< /taiwanese >}}
