+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
description = '文章描述'
summary = '文章摘要'
toc = false
language_type = "bilingual"
image = "/images/"
tags = ["台華雙文","台文","華文"]
mandarin_title = "華文標題"
+++

{{< figure
src="/images/"
alt=""
caption="">}}

{{< mandarin >}}
華文……
{{< /mandarin >}}

{{< taiwanese >}}
台文……
{{< /taiwanese >}}
