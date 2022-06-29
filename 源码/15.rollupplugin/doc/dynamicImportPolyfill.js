import('./msg.js').then(res => console.log(res.default))

/**
 * 
 * @param {*} filename  ./msg
 * @param {*} url http://127.0.0.1:8080/index.js
 */
function dynamicImportPolyfill(filename, url) {
  return new Promise(resolve => {
    //http://127.0.0.1:8080/msg.js http://127.0.0.1:8080/msg-72e24c7f.js
    const resourceUrl = new URL(filename, url).href;
    let script = document.createElement('script');
    script.onload = () => {
      debugger
      resolve(window.mod);
    }
    script.type = 'module';
    /*  const blob = new Blob([
       `import * as mod from ${JSON.stringify(resourceUrl)};`,
       "window.mod = mod;"
     ], { type: 'text/javascript' });
      script.src = URL.createObjectURL(blob)
      */
    script.innerHTML = `
    import * as mod from ${JSON.stringify(resourceUrl)};
    window.mod = mod;
    `;
    document.head.appendChild(script);
  });
}
console.log(dynamicImportPolyfill);