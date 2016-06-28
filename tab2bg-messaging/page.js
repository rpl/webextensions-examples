window.addEventListener("load", () => {
  document.querySelector("#set-data").addEventListener("click", () => {
    let key = document.querySelector("#req-key").value;
    let value = document.querySelector("#req-value").value;

    let data = { type: "set-data", data: { key, value } };
    console.log("DATA", data);

    chrome.runtime.sendMessage(data);
  });

  document.querySelector("#get-data").addEventListener("click", () => {
    chrome.runtime.sendMessage({
      type: "get-data",
      data: {
        key: document.querySelector("#req-key").value,
      }
    }, function (reply) {
      if (reply) {
        document.querySelector("#req-value").value = reply.result;
      }
    });
  });
});
