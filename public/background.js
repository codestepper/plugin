/* eslint-disable */
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'cm-frame');
      iframe.setAttribute(
        'style',
        'top: 20px;right: 20px;width: 400px;height: 300px;z-index: 2147483650;border: none; position:fixed;background: #FFFFFF; box-shadow: 0 0 10px 10px #666'
      );
      iframe.setAttribute('allow', '');
      iframe.src = chrome.runtime.getURL('index.html')
      document.body.appendChild(iframe);
    }
  });
});
