"use strict";

async function init() {
  const currentUrl = window.location.href;
  if (!currentUrl.includes("/wiki/") || currentUrl.includes("action=edit")) {
    return;
  }
  try {
    const contentElement = document.querySelector("#mw-content-text");
    if (!contentElement) {
      throw new Error("Article content not found");
    }
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = "";
    const header = document.createElement("div");
    header.style.cssText = `
      padding: 10px;
      background: #f8f9fa;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    `;
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Back to normal view";
    toggleButton.style.cssText = `
      padding: 2px 4px;
      cursor: pointer;
      margin-right: 10px;
    `;
    toggleButton.onclick = () => {
      document.body.innerHTML = originalContent;
    };
    const donateButton = document.createElement("button");
    donateButton.textContent = "Donate to Wikimedia";
    donateButton.style.cssText = `
      padding: 2px 4px;
      cursor: pointer;
    `;
    donateButton.onclick = () => {
      window.open("https://donate.wikimedia.org/", "_blank");
    };
    header.appendChild(toggleButton);
    header.appendChild(donateButton);
    document.body.appendChild(header);
    const container = document.createElement("div");
    container.style.cssText = `
      white-space: pre-wrap;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    `;
    const paragraphs = contentElement.querySelectorAll("p");
    let articleText = "";
    paragraphs.forEach(p => {
      let text = p.textContent;
      text = text.replace(/\(\.mw-parser-output.*?\)/g, "");
      text = text.replace(/\{.*?\}/g, "");
      articleText += text + "\n\n";
    });
    container.textContent = articleText;
    document.body.appendChild(container);
  } catch (error) {
    document.body.innerHTML = `
      <div style="color: red; padding: 20px; font-family: system-ui;">
        Error loading article: ${error.message}
      </div>
    `;
  }
}

init();
