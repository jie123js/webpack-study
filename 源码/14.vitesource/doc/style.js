const __vite__id = "/src/App.vue?vue&type=style&index=0&lang.css"
const __vite__css = "\nh1 {\r\n  color: red;\n}\r\n"
__vite__updateStyle(__vite__id, __vite__css)


function __vite__updateStyle(id, css) {
  let style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}