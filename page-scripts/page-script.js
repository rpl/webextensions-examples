var p = document.createElement("p");
p.textContent = "This paragraph was added by a page script.";
p.setAttribute("id", "page-script-para");
document.body.appendChild(p);

window.foo = "This global variable was added by a page script";

window.confirm = function() {
  return "The page script has also redefined 'confirm'";
}

// UI stuff

var output = document.getElementById("output");

var highlightPara = document.getElementById("highlight-para");
var showFoo = document.getElementById("show-foo");
var showWindowConfirm = document.getElementById("show-window.confirm");

highlightPara.addEventListener("click", handleHighlightPara, false);
showFoo.addEventListener("click", handleShowFoo, false);
showWindowConfirm.addEventListener("click", handleShowWindowConfirm, false);

function handleHighlightPara() {
  var pageScriptPara = document.getElementById("page-script-para");
  pageScriptPara.style.backgroundColor = "red";
}

function handleShowFoo() {
  output.textContent = "window.foo=" + window.foo;
}

function handleShowWindowConfirm() {
  output.textContent = "window.confirm=" + window.confirm.toSource();
}
