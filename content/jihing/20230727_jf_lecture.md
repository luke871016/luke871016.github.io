+++
date = '2023-07-27T01:53:06+08:00'
draft = false
title = '台文按怎排？Hōo 編輯、自媒體 ê 台語文排版實作'
description = '文章描述'
summary = '2023 年七月佇 justfont 字戀小聚的台語字型講座，講著台語文字型佮排版的各種無奈佮解方'
image = '/images/2023jflecture_cover2.jpeg'
toc = true
language_type = "taiwanese"
tags = ["台文", "排版", "字型"]
+++

{{< youtube vfLMAMch-OY >}}

## 字辭典、文獻、學習資源

- [教育部臺灣閩南語常用詞辭典](https://sutian.moe.edu.tw/und-hani/)[^1]
- [台語文記憶](http://ip194097.ntcu.edu.tw/memory/TGB/mowt.asp)[^2]
- [甘字典查詢-台語信望愛](https://taigi.fhl.net/dick/)
- [ChhoeTaigi 台語辭典+](https://chhoe.taigi.info/)
- [公視台語台台語新詞辭庫](https://www.taigitv.org.tw/taigi-words)
- [臺灣閩南語羅馬字拼音教學網](https://tailo.moe.edu.tw/)
- [一個禮拜學好台羅拼音！](https://hackmd.io/@itk1523/1week-kip)
- [臺灣話 ê 簿仔紙許君豪台語學習資源整理](https://junhaoshihmd.blogspot.com/2019/03/ohtaigi.html?fbclid=IwAR1s74sGxwDJZ3uALJeTOPOO9aYlOsQswWMSOkUiRaSj_YomWroavNtGk2M)
- [共母語揣轉來：臺語媽媽的故事 電子繪本](http://tgmm.nttu.edu.tw/)

[^1]: 這馬已經改名做「教育部臺灣台語常用詞辭典」
[^2]: 這幾冬真濟舊網頁因為政府資安要求所以禁起來矣，這馬台語文記憶由台文雞絲麵接手維護（[新網站](https://kiek.taigi.info/)）

## 字型工具、計畫、輸入法

- [烏衣行閩客語舊造字轉 Unicode](https://oikasu.com/wp/?p=1365)
- [再會豆腐字本土語言外字表](https://tauhu.tw/gua-ji-pio/)
- [jf 7000 當務字集](https://justfont.com/jf7000)
- [再會豆腐字豆腐台語詞庫](https://tauhu.tw/su-jip-huat/)
- [信望愛台語客語輸入法](https://taigi.fhl.net/TaigiIME/)

## 台語字型推薦、列表

- [字嗨！支援台客語字型列表](https://zi-hi.com/%E6%94%AF%E6%8F%B4%E5%8F%B0%E5%AE%A2%E8%AA%9E%E5%AD%97%E5%9E%8B%E5%88%97%E8%A1%A8)
- [莊明諺-台語字型清單](https://docs.google.com/spreadsheets/d/1aEonJl_ESGf3Jjsd1f7xFEIlmLsG0arCanZ5Ogr4Fc4/edit?fbclid=IwAR1kk_w0W5S70SjzWvU90ajX5zuad6igMUntFa_TVt0Mlp0pW5sIEtl_SDs&pli=1#gid=0)
- [台灣楷體、台灣宋體](http://wesingkasu.blogspot.com/2012/01/blog-post_1223.html)
- [jf open 粉圓](https://justfont.com/huninn/?gad=1&gclid=Cj0KCQjwiIOmBhDjARIsAP6YhSXLJhV2g_m-JpcVMY6ux8HISA9vy-rm5fgYDlx4W7yV_s5Kwftyx10aAoRIEALw_wcB)

## 漢羅距離

- [董福興-漢字與英文、數字的間距怎麼處理？](https://bobtung.medium.com/%E6%BC%A2%E5%AD%97%E8%88%87%E8%8B%B1%E6%96%87-%E6%95%B8%E5%AD%97%E7%9A%84%E9%96%93%E8%B7%9D%E6%80%8E%E9%BA%BC%E8%99%95%E7%90%86-cd3c7144cd8a)
- [活版印刷小學徒](https://www.facebook.com/search/top?q=%E6%B4%BB%E7%89%88%E5%8D%B0%E5%88%B7%E5%B0%8F%E5%AD%B8%E5%BE%92)

## indesign GREP 咒語

用 GREP 揣著漢字邊仔的所有空白符號

```
(?<=~K)\s+|\s+(?=~K)
```

用 GREP 揣著所有的羅馬字佮數字

```
[a-zA-Z\x{00C0}-\x{024F}\x{0300}-\x{030D}\x{0358}\x{207F}\x{1D3A}0-9-]+
```
