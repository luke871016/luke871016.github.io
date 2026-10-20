+++
date = '2026-07-16T01:00:00+08:00'
draft = false
title = '臺語歌真正正字歌詞網–歌詞語料搜揣'
description = '這个網頁會當產生練習寫台語文的學習單，內底嘛有建中開源的台語文教材'
summary = '這个網頁會當產生練習寫台語文的學習單，內底嘛有建中開源的台語文教材'
toc = false
language_type = "bilingual"
image = "/images/taigi_lyrics_4.png"
series = ["建中實用工具"]
tags = ["雙語對照","實用工具","歌詞"]
comments= false
+++

[**臺語歌真正正字歌詞網–歌詞語料搜揣 網頁連結**](https://tkt7235.pythonanywhere.com/)

{{< mandarin >}}

{{< figure
src="/images/taigi_lyrics_1.png"
alt="用演唱者的名字搜尋歌曲"
caption="用演唱者的名字搜尋歌曲">}}

[臺語歌真正正字歌詞網](https://www.facebook.com/groups/922800454445724)這個 Facebook 社團已經經營超過 10 年，累積出一個將近三萬首歌的大型資料庫，卻一直沒有一個方便的方式可以直接搜尋歌詞文本。

想知道某種詞有沒有出現在歌詞裡，只能用 Facebook 非常不好用的搜尋功能，不然就是祈求 Google 有收錄。

這個網頁把所有歌詞資料變成可以搜尋的文本，而且提供比照教典與國教院臺灣台語語料庫的搜尋功能與特性，用漢字、台羅、數字式台羅都能找得到資料庫裡所有的歌詞資料，也能針對演唱者和歌名搜尋。

另外也有提供進階的 REGEX 模式，可以用正規表示式搜尋歌詞文本，利用正規表示式可以找到特徵的句型、聲調、押韻、輕聲等等的內容，相關的特性比照[國教院的語料庫](https://tggl.naer.edu.tw/corpora)，搜尋的邏輯說明與範例可以參考[國教院的正規表示式查詢說明文件](https://drive.google.com/file/d/1TIslwhtRyKp5_MI6mssueJJdMuNst98S/view)。

網頁也有提供類似卡拉 OK 歌本的索引目錄，可以照歌名首字或演唱者名首字去找，和 Shiangshiou Hu 的表格是一樣的功能。

每一條歌詞資料也都有提供原文、漢字、台羅三個版本，還有原始社團文章的連結，通常在原始社團文章裡都能找到那首歌的 Youtube 版本來聽。

感謝各位偉大的貢獻者，還有 W.b. Chen 和 Shiangshiou Hu 兩位先進一直在整理歌詞編號和目錄。

網頁是用 Flask 開發的，目前架在 PythonAnywhere 的免費空間，搜尋效能還不算很好，有時候要等比較久，這點比較抱歉，不過一定找得到。以後應該會租一台 server 來放，效能可以再更好一點。

## 用你愛的歌練打字

{{< figure
src="/images/taigi_lyrics_2.png"
alt="每一首歌都有自己單獨的頁面"
caption="每一首歌都有自己單獨的頁面，[按這裡](https://tkt7235.pythonanywhere.com/song/247)就可以連到望春風的歌詞">}}

每一首歌都有自己單獨的頁面方便分享，也有用程式把歌詞的漢字和羅馬字抓出來，按頁面的「⌨️ 佇台語文拍字練習拍這條歌」就可以連到 [台語文打字練習](https://kiantiong.com/taigi_typing/)，系統會自動把歌詞放入網頁的自訂文本裡，用你喜歡的歌練打字喔！歌詞普遍會比一般文章更難打，因為比較容易用到一些口語不太會講的語詞。

{{< figure
src="/images/taigi_lyrics_3.png"
alt="我打完整首望春風要兩分鐘，一分鐘四十幾個音節"
caption="我打完整首望春風要兩分鐘，一分鐘四十幾個音節">}}

{{< /mandarin >}}

{{< taiwanese >}}

{{< figure
src="/images/taigi_lyrics_1.png"
alt="用演唱者的名揣歌"
caption="用演唱者的名揣歌">}}

[臺語歌真正正字歌詞網](https://www.facebook.com/groups/922800454445724)這个面冊社團已經紡超過10年，粒積做一个欲三萬條歌的大型資料
庫，煞一直攏無一个方便的方式會當直接揣歌詞文本。

想欲知影啥物款的詞敢有出現佇歌詞內底，干焦會當用面冊不止仔歹用的搜揣功能，抑無就是愛祈求 Google 有收錄。

這个網頁共所有的歌詞資料變做會當搜揣的文本，而且提供比照教典佮國教院臺灣台語語料庫的搜揣功能佮特性，用漢字、台羅、數字式台羅攏揣通揣著資料庫內底所有的歌詞資料，嘛會當針對演唱者佮歌名揣。

另外嘛有提供進階的 REGEX 模式，會當用正規表示式揣歌詞文本，利用正規表示式會當揣著特徵的句型、聲調、押韻、輕聲等等的內容，相關的特性比照[國教院的語料庫](https://tggl.naer.edu.tw/corpora)，搜揣的理路說明佮範例會當參考[國教院的正規表示式查詢說明文件](https://drive.google.com/file/d/1TIslwhtRyKp5_MI6mssueJJdMuNst98S/view)。

網頁嘛有提供袂輸kha-lá-óo-khe歌本的索引目錄，會當照歌名頭字抑是演唱者名頭字去揣，佮 Shiangshiou Hu 的表格是仝款的功能。

每一條歌詞資料嘛攏有提供原文、漢字、台羅三个版本，嘛有原始社團文章的連結，通常佇原始社團文章攏通揣著彼條歌的 Youtube 版本通聽。

感謝各位偉大的貢獻者，閣有 W.b. Chen 佮 Shiangshiou Hu 兩个先進一直有咧整理歌詞編號佮目錄。

網頁是用 Flask 所開發，目前起佇 PythonAnywhere 的免費空間，搜揣效能猶無講蓋好，有當時仔愛等較久，這較失禮，毋過一定揣會著。以後應該會稅一个 server 來囥，效能會當加較好。

## 用你愛的歌練拍字

{{< figure
src="/images/taigi_lyrics_2.png"
alt="每一條歌攏有家己單獨的頁面"
caption="每一條歌攏有家己單獨的頁面，[揤遮](https://tkt7235.pythonanywhere.com/song/247)就會當連去望春風的歌詞">}}

每一條歌攏有家己單獨的頁面方便分享，嘛有用程式共歌詞的漢字佮羅馬字掠出來，揤頁面的「⌨️ 佇台語文拍字練習拍這條歌」就會得通連去 [台語文拍字練習](https://kiantiong.com/taigi_typing/)，系統會自動共歌詞囥入去網頁的自訂文本內底，用你佮意的歌練拍字喔！歌詞普遍會比一般的文章較歹拍，因為較會用著一寡口語袂講的語詞。

{{< figure
src="/images/taigi_lyrics_3.png"
alt="我拍規條望春風愛兩分鐘，一分鐘四十幾个音節"
caption="我拍規條望春風愛兩分鐘，一分鐘四十幾个音節">}}

{{< /taiwanese >}}