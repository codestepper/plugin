/* eslint-disable */
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (toggled) => {
      const el = document.getElementById('cm-frame')
      if (el !== null && el.style.display !== "none") {
        el.style.display = "none";
        return;
      } else if (el !== null) {
        el.style.display = "block";
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'cm-frame');
      iframe.setAttribute(
        'style',
        'top: 20px;right: 20px;width: 400px;height: 300px;z-index: 2147483650;border: none; position:fixed;background: #FFFFFF; box-shadow: 0 0 10px 10px #666'
      );
      iframe.setAttribute('allow', '');
      iframe.src = chrome.runtime.getURL('index.html')
      document.body.appendChild(iframe);
      toggled = true;
    },
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: (request) => {
        if (request.toggle) {
          const el = document.getElementById('cm-frame')
          if (el !== null && el.style.display !== "none") {
            el.style.display = "none";
            return;
          } else if (el !== null) {
            el.style.display = "block";
            return;
          }
        }

        try {
          const el = document.getElementById(request.id);
          // Scroll the line into view and click on it
          el.scrollIntoView({ block: "center", inline: "center" });
          el.click();
        } catch (e) {

        }
      },
      args: [request]
    });

    if (request.toggle) {
      return;
    }

    sendResponse({ url: request.path });
  }
);
