var p = document.createElement("p");
p.textContent = "This paragraph was added by a page script.";
document.body.appendChild(p);

window.foo = "This global variable was added by a page script";

window.confirm = function() {
  return "The page script has also redefined 'confirm'";
}
