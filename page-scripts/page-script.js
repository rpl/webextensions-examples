var p = document.createElement("p");
p.textContent = "Here's another paragraph, added by a page script.";
document.body.appendChild(p);

window.foo = "Here's a global variable, added by a page script";

window.confirm = function() {
  console.log("The page script has also redefined 'confirm'");
  return true;
}
