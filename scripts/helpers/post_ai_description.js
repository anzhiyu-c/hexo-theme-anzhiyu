hexo.extend.helper.register("post_ai_description", async function ({ options = {} }) {
  const page = this.page;
  const config = this.config;

  let description = page.description || page.content || page.title || config.description;

  if (description) {
    description = escapeHTML(stripHTML(description).substring(0, 500).trim()).replace(/\n/g, " ");
    if (page.ai) {
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // 请替换成你的API密钥
      },
      body: JSON.stringify({
        prompt: description,
        max_tokens: 60, // 生成的摘要长度
        temperature: 0.7, // 温度值，影响生成的摘要随机程度
        n: 1, // 生成摘要的数量
        stop: ["。"], // 停止符，当生成的摘要遇到该符号时停止生成
      }),
    };

    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", requestOptions);
    const result = await response.json();
    const summary = result.choices[0].text.trim();
    return summary;
  }
});
