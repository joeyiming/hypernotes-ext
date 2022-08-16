// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
import html from "./sidebar.html";
import css from "./style/sidebar.css";

console.log('[content.js] loaded');
// console.log(html);
// console.log(css);


chrome.runtime.onMessage.addListener(function (msg, sender) {
  let iframe = document.getElementById("sidebar");
  console.log(iframe);
  if (msg.state) {
    openPanel(iframe);
  } else {
    closePanel(iframe);
  }
});

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

function createFrame(){
  let iframe = document.createElement('iframe');
  iframe.setAttribute("id", "sidebar");
  iframe.style.position = "fixed";
  iframe.style.height = "100%";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.border = "none";
  
  return iframe;
}

function openPanel(iframe) {
  iframe.style.width = "400px";
}
function closePanel(iframe) {
  iframe.style.width = "0px";
}