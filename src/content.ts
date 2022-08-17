// content script
// 执行于隔离环境，直接与页面 DOM 交互，支持部分 chrome api
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
import html from "./sidebar.html";
import css from "./style/sidebar.css";

// 成功加载 content script
console.log('[content.js] loaded');

// 与 service worker 通信
chrome.runtime.onMessage.addListener(function (msg, sender) {
  let iframe = document.getElementById("sidebar");
  console.log(iframe);
  if (msg.state) {
    openPanel(iframe);
  } else {
    closePanel(iframe);
  }
});

// 创建侧边栏
if (document.getElementById("sidebar") === null || document.getElementById("sidebar") === undefined) {
  let iframe = createFrame();
  document.body.appendChild(iframe);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  let style = `<style>${css}</style>`
  iframe.contentDocument.body.innerHTML = iframe.contentDocument.body.innerHTML + style;
  iframe.contentWindow.document.close();
  console.log(iframe);
}

// 监听选择文本事件
document.onmouseup = handleSelection;

// 处理选择文本，高亮或标注
function handleSelection(event) {
  let selection = document.getSelection().toString();
  if (selection !== '') {
    console.log(selection);
  }
}

// 创建侧边栏方法
function createFrame(){
  let iframe = document.createElement('iframe');
  iframe.setAttribute("id", "sidebar");
  iframe.style.position = "fixed";
  iframe.style.height = "100%";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999";
  
  return iframe;
}

function openPanel(iframe) {
  iframe.style.width = "400px";
}
function closePanel(iframe) {
  iframe.style.width = "0px";
}