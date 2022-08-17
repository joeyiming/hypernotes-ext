// service worker
// 不与页面直接交互，可使用所有 chrome api，通过与content script通信实现页面交互
import { Extension } from "./extension";

function init(){
  const extension = new Extension();

  let workState = true;

  // 启动时执行代码
  chrome.runtime.onInstalled.addListener(() => {
    displayState(workState);
  })

  // 点击插件图标时执行代码
  chrome.action.onClicked.addListener((tab) => {
    workState = !workState;
    displayState(workState);
    chrome.tabs.sendMessage(tab.id, { state: workState });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['./contentScript.js']
    });
  });


  function displayState(state) {
    if (state) {
      console.log('Hypernotes 已启动');
      chrome.action.setBadgeText({ text: 'ON' });
    } else {
      console.log('Hypernotes 已关闭');
      chrome.action.setBadgeText({ text: 'OFF' });
    }
  }
}

init();