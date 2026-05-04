/**
 * 漢字／臺羅平行文本對齊與顯示（移植自 taigi_typing publish/taigi_typing/index.html）
 * 供 Hugo shortcode tailo_parallel 使用。
 */
(function () {
  "use strict";

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  function normalizeTailoText(text) {
    const punctMarks = "，。、！？：；,.!?:;";
    let result = text;
    for (const mark of punctMarks) {
      const regex = new RegExp("\\s*\\" + mark + "\\s*", "g");
      result = result.replace(regex, " " + mark + " ");
    }
    result = result.replace(/\s*"\s*/g, ' " ');
    result = result.replace(/\s*\u201C\s*/g, " \u201C ");
    result = result.replace(/\s*\u201D\s*/g, " \u201D ");
    result = result.replace(/\s*'\s*/g, " ' ");
    result = result.replace(/\s*\u2018\s*/g, " \u2018 ");
    result = result.replace(/\s*\u2019\s*/g, " \u2019 ");
    result = result.replace(/\s+/g, " ").trim();
    return result;
  }

  function countSyllables(word) {
    const cleaned = word.replace(/--/g, "-");
    const parts = cleaned.split("-").filter((p) => p.length > 0);
    return parts.length;
  }

  function isPunctuation(text) {
    const marks = "，。、！？「」：；（）,.!?:;''『』【】《》〈〉“”‘’";
    return marks.includes(text);
  }

  function isPunctuationMatch(hanjiChar, tailoChar) {
    if (hanjiChar === tailoChar) return true;
    const punctPairs = {
      "「": "\u201C",
      "」": "\u201D",
      "『": "\u2018",
      "』": "\u2019",
      "，": ",",
      "。": ".",
      "！": "!",
      "？": "?",
      "：": ":",
      "；": ";",
      "（": "(",
      "）": ")",
    };
    return punctPairs[hanjiChar] === tailoChar;
  }

  function isTailoChar(char) {
    const baseChar = char[0];
    if (/[a-zA-Z]/.test(baseChar)) return true;
    if (baseChar === "-") return true;
    const code = baseChar.charCodeAt(0);
    if (code >= 0x00c0 && code <= 0x00ff) return true;
    if (code >= 0x0100 && code <= 0x017f) return true;
    if (code >= 0x0180 && code <= 0x024f) return true;
    if (code >= 0x1e00 && code <= 0x1eff) return true;
    return false;
  }

  function splitIntoGraphemes(text) {
    return text.match(/\P{M}\p{M}*/gu) || [];
  }

  function extractSpecialSegments(hanjiText) {
    const chars = splitIntoGraphemes(hanjiText);
    const segments = [];
    let i = 0;
    while (i < chars.length) {
      const char = chars[i];
      if (/\d/.test(char)) {
        let numStr = char;
        const startPos = i;
        i++;
        while (i < chars.length && /\d/.test(chars[i])) {
          numStr += chars[i];
          i++;
        }
        segments.push({ type: "number", text: numStr, start: startPos, end: i });
      } else if (isTailoChar(char)) {
        let tailoStr = char;
        const startPos = i;
        i++;
        while (i < chars.length && (isTailoChar(chars[i]) || chars[i] === "-")) {
          tailoStr += chars[i];
          i++;
        }
        segments.push({ type: "tailo", text: tailoStr, start: startPos, end: i });
      } else {
        i++;
      }
    }
    return segments;
  }

  function normalizeRomanForMatch(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "");
  }

  function analyzeTailoText(tailoText) {
    const normalized = normalizeTailoText(tailoText);
    const words = normalized.split(/\s+/).filter((w) => w.length > 0);
    const analysis = [];
    for (const word of words) {
      if (isPunctuation(word)) {
        analysis.push({ text: word, syllables: 1, isPunctuation: true });
      } else if (/^\d+$/.test(word)) {
        analysis.push({ text: word, syllables: 1, isPunctuation: false });
      } else {
        analysis.push({
          text: word,
          syllables: countSyllables(word),
          isPunctuation: false,
        });
      }
    }
    return analysis;
  }

  function smartSegmentHanji(hanjiText, tailoAnalysis) {
    hanjiText = hanjiText.replace(/\s+/g, "");
    const specialSegments = extractSpecialSegments(hanjiText);
    const chars = splitIntoGraphemes(hanjiText);
    const segments = [];
    let charIndex = 0;
    let tailoIndex = 0;

    while (tailoIndex < tailoAnalysis.length) {
      const item = tailoAnalysis[tailoIndex];

      if (item.isPunctuation) {
        if (charIndex < chars.length) {
          const hanjiChar = chars[charIndex];
          if (isPunctuation(hanjiChar) || isPunctuationMatch(hanjiChar, item.text)) {
            segments.push(hanjiChar);
            charIndex++;
          } else {
            segments.push(item.text);
          }
        } else {
          segments.push(item.text);
        }
        tailoIndex++;
      } else {
        const specialAtPos = specialSegments.find((s) => s.start === charIndex);

        if (specialAtPos) {
          let combinedText = "";
          const matchedWords = [];
          let matched = false;

          for (
            let j = tailoIndex;
            j < tailoAnalysis.length && !tailoAnalysis[j].isPunctuation;
            j++
          ) {
            combinedText += tailoAnalysis[j].text.replace(/\s+/g, "");
            matchedWords.push(tailoAnalysis[j].text);
            if (combinedText === specialAtPos.text) {
              for (const word of matchedWords) {
                segments.push(word);
              }
              charIndex = specialAtPos.end;
              tailoIndex += matchedWords.length;
              matched = true;
              break;
            }
          }

          if (!matched) {
            const syllableCount = item.syllables;
            const segment = chars.slice(charIndex, charIndex + syllableCount).join("");
            segments.push(segment);
            charIndex += syllableCount;
            tailoIndex++;
          }
        } else {
          const syllableCount = item.syllables;
          let segmentEnd = charIndex + syllableCount;
          const mixedSegment = specialSegments.find(
            (s) => s.type === "tailo" && s.start >= charIndex && s.start < segmentEnd
          );
          if (mixedSegment) {
            const normalizedTailo = normalizeRomanForMatch(item.text);
            const normalizedMixed = normalizeRomanForMatch(mixedSegment.text);
            if (normalizedTailo.endsWith(normalizedMixed)) {
              segmentEnd = Math.max(segmentEnd, mixedSegment.end);
            }
          }
          const segment = chars.slice(charIndex, segmentEnd).join("");
          segments.push(segment);
          charIndex = segmentEnd;
          tailoIndex++;
        }
      }
    }

    if (charIndex < chars.length) {
      const remaining = chars.slice(charIndex).join("");
      for (let i = segments.length - 1; i >= 0; i--) {
        if (!isPunctuation(segments[i])) {
          segments[i] += remaining;
          break;
        }
      }
    }

    return segments;
  }

  function isHanjiChar(char) {
    return /[\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2CEB0}-\u{2EBEF}\u{30000}-\u{3134F}\uF900-\uFAFF\u{2F800}-\u{2FA1F}]/u.test(
      char
    );
  }

  function getNextHanjiChar(text, index) {
    if (index >= text.length) return null;
    const char = text[index];
    const code = char.charCodeAt(0);
    if (code >= 0xd800 && code <= 0xdbff && index + 1 < text.length) {
      const nextCode = text.charCodeAt(index + 1);
      if (nextCode >= 0xdc00 && nextCode <= 0xdfff) {
        const pair = char + text[index + 1];
        if (isHanjiChar(pair)) return { char: pair, length: 2 };
      }
    }
    if (isHanjiChar(char)) return { char, length: 1 };
    return null;
  }

  function createSingleTextMarkup(text) {
    let html = "";
    let i = 0;
    while (i < text.length) {
      const char = text[i];
      if (char === " ") {
        html += " ";
        i++;
        continue;
      }
      if (isPunctuation(char)) {
        html +=
          '<span class="taigi-par-mark taigi-par-punct">' + escapeHtml(char) + "</span>";
        i++;
        continue;
      }
      const hanjiMatch = getNextHanjiChar(text, i);
      if (hanjiMatch) {
        html +=
          '<span class="taigi-par-mark">' + escapeHtml(hanjiMatch.char) + "</span>";
        i += hanjiMatch.length;
        continue;
      }
      if (/\d/.test(char)) {
        let numberStr = "";
        while (i < text.length && /\d/.test(text[i])) {
          numberStr += text[i];
          i++;
        }
        html += '<span class="taigi-par-mark">' + escapeHtml(numberStr) + "</span>";
        continue;
      }
      let word = "";
      while (i < text.length) {
        const c = text[i];
        if (c === " " || isPunctuation(c) || getNextHanjiChar(text, i)) break;
        word += c;
        i++;
      }
      if (word.length > 0) {
        html += '<span class="taigi-par-mark">' + escapeHtml(word) + "</span>";
      } else {
        i++;
      }
    }
    return html;
  }

  /**
   * 與 createRubyText 相同之掃描語意，產出 token 供三種顯示模式共用（略過 kinsoku 組版）。
   */
  function collectDisplayTokens(tailoText, tailoAnalysis, hanjiSegments) {
    const tokens = [];
    let i = 0;
    let wordIdx = 0;

    while (i < tailoText.length && wordIdx < tailoAnalysis.length) {
      const char = tailoText[i];
      if (char === " ") {
        tokens.push({ kind: "space" });
        i++;
        continue;
      }

      const item = tailoAnalysis[wordIdx];
      const tailo = item.text;
      const hanji = hanjiSegments[wordIdx] || "";
      const remaining = tailoText.substring(i);

      if (remaining.startsWith(tailo)) {
        tokens.push({
          kind: "pair",
          hanji,
          tailo,
          isPunctuation: !!item.isPunctuation,
        });
        i += tailo.length;
        wordIdx++;
        continue;
      }

      tokens.push({ kind: "raw", char });
      i++;
    }

    while (i < tailoText.length) {
      const ch = tailoText[i];
      if (ch === " ") tokens.push({ kind: "space" });
      else tokens.push({ kind: "raw", char: ch });
      i++;
    }

    return tokens;
  }

  function renderHanjiRuby(tokens) {
    let html = "";
    for (const t of tokens) {
      if (t.kind === "space") {
        html += " ";
      } else if (t.kind === "raw") {
        html += escapeHtml(t.char);
      } else if (t.kind === "pair") {
        const cls =
          "taigi-par-ruby" + (t.isPunctuation ? " taigi-par-punct-ruby" : "");
        html += "<ruby class=\"" + cls + "\">";
        html += escapeHtml(t.hanji);
        html += "<rt>" + escapeHtml(t.tailo) + "</rt></ruby>";
      }
    }
    return html;
  }

  function renderTailoRuby(tokens) {
    let html = "";
    for (const t of tokens) {
      if (t.kind === "space") {
        html += " ";
      } else if (t.kind === "raw") {
        html += escapeHtml(t.char);
      } else if (t.kind === "pair") {
        const cls =
          "taigi-par-ruby taigi-par-ruby-tailo" +
          (t.isPunctuation ? " taigi-par-punct-ruby" : "");
        html += "<ruby class=\"" + cls + "\">";
        html += escapeHtml(t.tailo);
        html += "<rt>" + escapeHtml(t.hanji) + "</rt></ruby>";
      }
    }
    return html;
  }

  /** 漢羅分開：各顯示使用者輸入的原始稿（保留換行） */
  function renderPlainSplit(hanjiText, tailoText) {
    if (hanjiText === tailoText) {
      return (
        '<div class="taigi-par-dual">' +
        '<p class="taigi-par-dual-block taigi-par-dual-h">' +
        escapeHtml(hanjiText) +
        "</p></div>"
      );
    }
    return (
      '<div class="taigi-par-dual">' +
      '<p class="taigi-par-dual-block taigi-par-dual-h">' +
      escapeHtml(hanjiText) +
      "</p>" +
      '<p class="taigi-par-dual-block taigi-par-dual-t">' +
      escapeHtml(tailoText) +
      "</p>" +
      "</div>"
    );
  }

  function normalizeNewlines(s) {
    return String(s || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }

  function buildAllModes(hanjiText, tailoText) {
    hanjiText = normalizeNewlines(hanjiText);
    tailoText = normalizeNewlines(tailoText);
    if (hanjiText === tailoText) {
      const single = createSingleTextMarkup(hanjiText);
      return {
        single: true,
        hanji: '<p class="taigi-par-plain">' + single + "</p>",
        tailo: '<p class="taigi-par-plain">' + single + "</p>",
        split: renderPlainSplit(hanjiText, tailoText),
      };
    }
    const analysis = analyzeTailoText(tailoText);
    const segments = smartSegmentHanji(hanjiText, analysis);
    const tokens = collectDisplayTokens(tailoText, analysis, segments);
    return {
      single: false,
      hanji: '<p class="taigi-par-line">' + renderHanjiRuby(tokens) + "</p>",
      tailo: '<p class="taigi-par-line taigi-par-line-latin">' + renderTailoRuby(tokens) + "</p>",
      split: renderPlainSplit(hanjiText, tailoText),
    };
  }

  function mountWidget(wrap, root) {
    const body = root.querySelector(".taigi-par-body");
    const tabList = root.querySelector(".taigi-par-tabs");
    const tabBtns = tabList
      ? Array.from(tabList.querySelectorAll("button.taigi-par-tab"))
      : [];
    const hanjiEl = root.querySelector(".taigi-par-src-hanji");
    const tailoEl = root.querySelector(".taigi-par-src-tailo");
    if (!body || tabBtns.length === 0 || !hanjiEl || !tailoEl) return;

    const hanji = hanjiEl.value != null ? String(hanjiEl.value) : "";
    const tailo = tailoEl.value != null ? String(tailoEl.value) : "";
    const dm = (root.getAttribute("data-taigi-default") || "hanji").trim();
    let mode =
      dm === "tailo" || dm === "split" ? dm : "hanji";
    if (mode !== "hanji" && mode !== "tailo" && mode !== "split") mode = "hanji";

    const modes = buildAllModes(hanji, tailo);

    function setMode(next) {
      mode = next;
      if (mode === "tailo") body.innerHTML = modes.tailo;
      else if (mode === "split") body.innerHTML = modes.split;
      else body.innerHTML = modes.hanji;
      tabBtns.forEach(function (btn) {
        const m = btn.getAttribute("data-taigi-mode");
        const selected = m === mode;
        btn.setAttribute("aria-selected", selected ? "true" : "false");
        btn.classList.toggle("is-active", selected);
        btn.tabIndex = selected ? 0 : -1;
      });
    }

    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const m = btn.getAttribute("data-taigi-mode");
        if (m && m !== mode) setMode(m);
      });
    });

    setMode(mode);
  }

  function boot() {
    document.querySelectorAll(".taigi-par-wrap").forEach(function (wrap) {
      const root = wrap.querySelector(".taigi-par-root");
      if (root) mountWidget(wrap, root);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
