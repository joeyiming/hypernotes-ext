// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// https://stackoverflow.com/questions/39610205/how-to-make-side-panel-in-chrome-extension

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
  let iframe = document.createElement('iframe');
  iframe.setAttribute("id", "sidebar");
  iframe.style.background = "green";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "9000000000000000000";
  iframe.frameBorder = "none";

  document.body.appendChild(iframe);
  
}

function openPanel(iframe) {
  iframe.style.width = "400px";
}
function closePanel(iframe) {
  iframe.style.width = "0px";
}