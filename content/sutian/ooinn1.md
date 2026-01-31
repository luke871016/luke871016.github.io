+++
date = '2025-05-22T11:48:17+08:00'
draft = false
title = '用芋圓字典比較「共」佮「佮」的精差'
description = '芋圓字典的REGEX語法會當揣例句，咱來揣出「共」佮「佮」的精差'
summary = '芋圓字典的REGEX語法會當揣例句，咱來揣出「共」佮「佮」的精差'
toc = false
language_type = "bilingual"
image = "/images/ooinn1-cover.jpg"
tags = ["芋圓字典","REGEX","台華雙文","台文","華文"]
mandarin_title = "用芋圓字典比較「共」和「佮」的精差"
series = ["芋圓字典"]
+++

{{< mandarin >}}
{{< figure
src="/images/ooinn1-cover.jpg"
alt="部份的搜尋結果"
caption="部份的搜尋結果">}}

台語的「共 kā」和「佮 kah」不好區分嗎？
分享一個實用的 REGEX 語法

```REGEX
[你我伊𪜶阮咱][共佮][你我伊𪜶阮咱]
```

透過芋圓字典，可以查到所有兩個代名詞中間加上「kā/kah」的例句組合，可以把這些例句都拿出來比較語意上的差異喔！

{{< /mandarin >}}

{{< taiwanese >}}

{{< figure
src="/images/ooinn1-cover.jpg"
alt="部份的搜揣結果"
caption="部份的搜揣結果">}}

台語的「共 kā」佮「佮 kah」敢足僫區分？
遮有一个實用的 REGEX 語法

```REGEX
[你我伊𪜶阮咱][共佮][你我伊𪜶阮咱]
```

怙芋圓字典，通揣著所有的兩個代名詞中央有「kā/kah」的例句組合，共遮的例句提出來就通好比較兩个精差喔！

{{< /taiwanese >}}
