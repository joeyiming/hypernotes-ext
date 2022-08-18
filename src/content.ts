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
  // console.log(iframe);
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

  // 在iframe中插入html
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();

  // 在iframe中插入css
  let style = `<style>${css}</style>`
  iframe.contentDocument.body.innerHTML = iframe.contentDocument.body.innerHTML + style;

  // 显示iframe
  openPanel(iframe);
}

// DOM 没有选择文本事件，通过监听按键事件来间接实现
document.onmouseup = handleSelection;
document.onmousedown = removeFloatBtn;

// 处理选择文本，高亮或标注
function handleSelection(event) {
  let selection = document.getSelection();
  let selectedText = selection.toString();
  if (selectedText !== '') {
    console.log(selection);
    console.log(event);
    // 创建按钮
    removeFloatBtn();
    let floatBtn = createFloatBtn(event.screenX, event.screenY);
    document.body.appendChild(floatBtn);
  }else{
    console.log("未选择文本");
  }
}

// 清除浮动按钮
function removeFloatBtn() {
  let floatBtn = document.getElementById("float-btn");
  if (floatBtn) {
    document.body.removeChild(floatBtn);
  }
}

// 创建侧边栏方法
function createFrame() {
  let iframe = document.createElement('iframe');
  iframe.setAttribute("id", "sidebar");
  iframe.style.position = "fixed";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
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

// 创建浮动按钮
function createFloatBtn(x, y) {
  let button = document.createElement("div");
  button.id = "float-btn";
  button.style.position = "absolute";
  button.style.width = "30px";
  button.style.height = "30px";
  button.style.left = x+"px";
  button.style.top = y+"px";
  button.style.border = "none";
  button.style.cursor = "pointer";

  let img = document.createElement("img");
  let imgURL = chrome.runtime.getURL("img/icon.png");
  img.setAttribute("src", imgURL);

  button.appendChild(img);
  return button;
}