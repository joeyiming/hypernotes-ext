// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// https://stackoverflow.com/questions/39610205/how-to-make-side-panel-in-chrome-extension

chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg == "toggle") {
    toggle();
  }
});

var iframe = document.createElement('iframe');
iframe.style.background = "green";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.src = chrome.extension.getURL("popup.html")

document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width == "0px") {
    iframe.style.width = "400px";
  }
  else {
    iframe.style.width = "0px";
  }
}