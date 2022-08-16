// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

console.log('[content.js] loaded');
chrome.runtime.onMessage.addListener(function (msg, sender) {
  let iframe = document.getElementById("sidebar")
  if (msg.state) {
    openPanel(iframe);
  } else {
    closePanel(iframe);
  }
});

if (document.getElementById("sidebar") === null || document.getElementById("sidebar") === undefined) {
  let iframe = createFrame();
  document.body.appendChild(iframe);
}

function createFrame(){
  let iframe = document.createElement('iframe');
  iframe.setAttribute("id", "sidebar");
  iframe.style.background = "green";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "9000000000000000000";
  return iframe;
}

function openPanel(iframe) {
  iframe.style.width = "400px";
}
function closePanel(iframe) {
  iframe.style.width = "0px";
}