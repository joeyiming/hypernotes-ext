import { Extension } from "./extension";

function init(){
  const extension = new Extension();

  let workState = true;

  chrome.runtime.onInstalled.addListener(() => {
    displayState(workState);
  })

  chrome.action.onClicked.addListener((tab) => {
    workState = !workState;
    displayState(workState);
    chrome.tabs.sendMessage(tab.id, { state: workState });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['js/content.js']
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