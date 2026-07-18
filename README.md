# DeepSeek AI PopClip 扩展

选中任意文字，一键完成**翻译、改写、总结、语法修正**——由 DeepSeek AI 驱动，无需离开当前应用。

![预览](https://img.shields.io/badge/macOS-12+-black?logo=apple)
![PopClip](https://img.shields.io/badge/PopClip-2025.9+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ 功能一览

| 功能 | 按钮 | 说明 | 效果 |
|:----:|:----:|------|:----:|
| 🌐 翻译 | 翻译 | 中英互译，自动识别原文语言 | 预览窗口 |
| ✏️ 改写 | 改写 | 用更专业的语气重写文字 | **原地替换** |
| 📊 总结 | 总结 | 用中文简洁总结长文本 | 预览窗口 |
| ✅ 语法 | 语法 | 检查并修正英文语法/拼写错误 | 预览窗口 |
| 🪄 问答 | 问答 | AI 回答任何问题 | 预览窗口 |

**关键区别：**
- 「改写」→ 选中文字后直接**原地替换**（粘贴回原位置）
- 其他功能 → 弹出预览窗口，确认后手动粘贴

---

## 📦 安装步骤

### 第一步：安装 PopClip

从 [pilotmoon.com/popclip](https://pilotmoon.com/popclip/) 下载安装 PopClip（macOS 平台老牌划词工具，付费但非常值）。

安装完成后，菜单栏会出现 PopClip 图标：

![PopClip 菜单栏图标](https://img.niupic.com/images/2020/11/30/8XcU.png)

### 第二步：下载扩展

**方式一（推荐）：** 从 Releases 下载预打包的 `.popclipextz` 文件

👉 [下载最新版 DeepSeek.popclipextz](https://github.com/zhonxia/popclip-deepseek/releases/latest/download/DeepSeek.popclipextz)

**方式二（手动）：** 克隆仓库自己打包

```bash
git clone https://github.com/zhonxia/popclip-deepseek.git
cd popclip-deepseek
# 直接双击 DeepSeek.popclipextz 即可安装
```

### 第三步：安装扩展

双击下载的 **DeepSeek.popclipextz** 文件，PopClip 会自动弹出安装提示：

![安装提示示意图](https://img.niupic.com/images/2020/11/30/8XcU.png)

点击 **Install** 完成安装。

> ⚠️ 如果双击后没反应，手动操作：
> 1. 打开 PopClip **Preferences...**（菜单栏 PopClip 图标 → Preferences）
> 2. 在左侧扩展列表确认出现 **DeepSeek AI**
> 3. 如果没有，将 `.popclipextz` 解压，把里面的 `DeepSeek.popclipext` 文件夹拷贝到 `~/Library/Application Support/PopClip/Extensions/`，重启 PopClip

### 第四步：获取 DeepSeek API Key

1. 访问 [platform.deepseek.com](https://platform.deepseek.com/)
2. 注册/登录账号
3. 进入 **API Keys** 页面
4. 点击 **Create new key**，复制生成的 Key（以 `sk-` 开头）

### 第五步：配置扩展

1. 菜单栏点 PopClip 图标 → **Preferences...**
2. 左侧扩展列表找到 **DeepSeek AI**
3. 填入以下三项：

| 字段 | 说明 | 示例值 |
|------|------|--------|
| **API Key** | 上一步获取的 Key | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **API Base URL** | API 地址（默认不用改） | `api.deepseek.com/v1` |
| **Model** | 模型名称 | `deepseek-chat` |

**可选：使用中转代理**
如果网络环境无法直连 DeepSeek，可以填中转 API 地址：

- **Base URL:** `www.micuapi.ai/v1`（示例中转站）
- **Model:** `deepseek-v4-flash` 或 `gpt-5.5`（取决于中转站支持的模型）

### 第六步：开始使用

配置完成后，在任意应用中**选中一段文字**，PopClip 菜单底部会出现 DeepSeek 的五个功能按钮：

试试以下场景：

| 场景 | 操作 |
|------|------|
| 阅读英文网页 | 选中英文 → 点 **翻译** → 看中文翻译 |
| 写中文邮件要发英文版 | 打好中文 → 选中 → 点 **翻译** → 替换成英文 |
| 润色自己的草稿 | 选中文字 → 点 **改写** → 原地替换成更专业的版本 |
| 快速了解长文章 | 选中全文 → 点 **总结** → 看摘要 |
| 检查英文拼写 | 选中英文 → 点 **语法** → 自动纠错 |

---

## ⚙️ 高级配置

### 使用自己的 API 中转

如果使用第三方 AI API 中转服务（如 MicuApi、OpenRouter 等），修改两个设置：

1. **API Base URL** → 改为中转站的地址（如 `www.micuapi.ai/v1`）
2. **Model** → 改为中转站支持的模型名（如 `deepseek-v4-flash`、`gpt-5.5`、`claude-sonnet-4`）

### API Key 报错 `-34018`（Keychain 错误）

少数 macOS 版本会出现 Keychain 写入失败。解决方法：

1. 打开 `deepseek.js` 源文件
2. 找到 `options.apikey` 这一行
3. 改为直接填入 Key：
   ```javascript
   // 修改前
   Authorization: `Bearer ${options.apikey}`,
   // 修改后
   Authorization: `Bearer sk-你的Key`,
   ```
4. 从 Config.json 中删除 `apikey` 的 option 定义
5. 重新打包安装

---

## 🏗️ 项目结构

```
popclip-deepseek/
├── README.md                          # 本教程
├── LICENSE                            # MIT 许可证
├── DeepSeek.popclipextz               # 可直接双击安装的扩展包
├── DeepSeek.popclipext/               # 解压后的扩展目录
│   ├── Config.json                    # 扩展元数据和选项配置
│   └── deepseek.js                    # 核心功能代码
└── source/                            # 源码目录
    ├── Config.json
    └── deepseek.js
```

### 技术原理

扩展通过 PopClip 的 JavaScript 模块系统运行：

1. 用户在任意应用中**选中文本**
2. PopClip **弹出动作菜单**，包含 5 个功能按钮
3. 用户**点击按钮** → 调用 `deepseek.js` 中的对应函数
4. 函数通过 **DeepSeek API**（OpenAI 兼容格式）发送请求
5. 结果通过 PopClip 的 `paste-result`（原地粘贴）或 `preview-result`（预览窗口）返回

### 自定义 prompt

如果想修改每个功能的提示词，编辑 `deepseek.js` 中的 `SYSTEM_PROMPTS` 对象即可：

```javascript
const SYSTEM_PROMPTS = {
  translate: "你的自定义翻译 prompt...",
  rewrite: "你的自定义改写 prompt...",
  // ...
};
```

也可以添加新的功能按钮，在文件末尾的 `exports.actions` 数组中追加即可。

---

## 🐛 常见问题

**Q: 按钮出现了但点击没反应？**
- 检查 API Key 是否已正确填入
- 检查网络连接（特别是使用中转代理时）
- 打开 PopClip Preferences 确认 DeepSeek AI 已启用

**Q: 提示 "Network Error"？**
- 检查 API Base URL 是否正确（不要漏掉 `/v1`）
- 如果使用代理，确认代理地址可访问

**Q: 翻译质量不好？**
- 尝试更换模型为 `deepseek-v4-flash`（更快）或 `deepseek-chat`
- 修改 SYSTEM_PROMPTS 中的提示词

**Q: 如何卸载？**
- PopClip Preferences → 左侧 DeepSeek AI → 点右下角的减号 `-` 按钮

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- [PopClip](https://pilotmoon.com/popclip/) - 强大的 macOS 划词工具
- [DeepSeek](https://platform.deepseek.com/) - 优秀的 AI 模型和 API
- [xinbs/PopClip-DeepSeek](https://github.com/xinbs/PopClip-DeepSeek) - 原始灵感
