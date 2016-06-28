const TAB_URL = chrome.runtime.getURL("page.html"); 

var NotSoUsefulData = {}

function doGetData({key} = {}, sendReply) {
  console.log("GET DATA", key);
  sendReply({
    result: NotSoUsefulData[key],
    error: false,
  });
}

function doSetData({key, value} = {}, sendReply) {
  console.log("SET DATA", key, value);
  NotSoUsefulData[key] = value;

  sendReply({
    error: false,
    message: "Data Saved",
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendReply) => {
  console.log("MSG", msg, "FROM", sender);

  if (sender.tab &&
      sender.tab.url == TAB_URL) {
    let { type, data } = msg;

    switch(type) {
    case "get-data":
      doGetData(data, sendReply);
      break;
    case "set-data":
      doSetData(data, sendReply);
      break;
    }
  }
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({
    url: TAB_URL,
  }, (tab) => {
    console.log("TAB opened", tab);
  });
});
