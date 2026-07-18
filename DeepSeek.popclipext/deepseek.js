"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;

const axios = require("axios");

const SYSTEM_PROMPTS = {
  translate:
    "你现在是一位专业的中英互译翻译官。请将内容翻译成相反的语言：如果是中文就翻译成英文，如果是英文就翻译成中文。只需要翻译，不需要解释。",
  rewrite: "请用专业的语气重写以下文本，保持原文语言不变。",
  summarize: "请用中文尽可能简洁地总结以下内容：",
  grammar:
    "你现在是一位专业的英语语法专家。请检查以下英文文本是否有语法错误或拼写错误。如果有错误，请直接返回修正后的文本；如果没有错误，请直接返回原文。不需要解释。",
  prompt: "你现在是一个百科全书，请用简洁的中文解释这个问题。",
};

async function callDeepSeek(text, systemPrompt, options) {
  const client = axios.create({
    baseURL: `https://${options.baseUrl}/`,
    headers: {
      Authorization: `Bearer ${options.apikey}`,
      "Content-Type": "application/json",
    },
  });

  const { data } = await client.post("chat/completions", {
    model: options.model,
    messages: [
      { role: "user", content: `${systemPrompt}\n\n${text.trim()}` },
    ],
  });

  return data.choices[0].message.content.trim();
}

const translate = {
  icon: "iconify:ri:translate",
  title: "翻译",
  after: "preview-result",
  code: async (input, options) => {
    return await callDeepSeek(input.text, SYSTEM_PROMPTS.translate, options);
  },
};

const rewrite = {
  icon: "symbol:pencil.and.outline",
  title: "改写",
  after: "paste-result",
  code: async (input, options) => {
    return await callDeepSeek(input.text, SYSTEM_PROMPTS.rewrite, options);
  },
};

const summarize = {
  icon: "iconify:carbon:summary-kpi",
  title: "总结",
  after: "preview-result",
  code: async (input, options) => {
    return await callDeepSeek(input.text, SYSTEM_PROMPTS.summarize, options);
  },
};

const grammar = {
  icon: "symbol:checkmark.bubble",
  title: "语法",
  after: "preview-result",
  code: async (input, options) => {
    return await callDeepSeek(input.text, SYSTEM_PROMPTS.grammar, options);
  },
};

const prompt = {
  icon: "symbol:wand.and.stars",
  title: "问答",
  after: "preview-result",
  code: async (input, options) => {
    const result = await callDeepSeek(
      input.text,
      SYSTEM_PROMPTS.prompt,
      options
    );
    // 尝试粘贴（如果光标在输入框内就粘贴进去，否则忽略）
    try { popclip.pasteText(result); } catch(e) { /* 非输入框，忽略 */ }
    return result;
  },
};

exports.actions = [translate, rewrite, summarize, grammar, prompt];
