var messenger = document.getElementById("messenger");

messenger.addEventListener("click", sendMessage);

function sendMessage() {
  window.postMessage({
    message: "Message from the page"
  }, "*");
}
