


function generation() {
  return {
    name: 'generation',
    ///钩子大部都是异步的，只有极少是同数的，如果同步话，不能写async
    outputOptions(outputOptions) {
      console.log('outputOptions');
    },
    async renderStart(outputOptions, inputOptions) {
      console.log('renderStart');
    },
    async banner() {
      console.log('//banner');
      //return '//banner';
    },
    async footer() {
      console.log('//footer');
      //return '//footer';
    },
    async intro() {
      console.log('//intro');
      //return '//intro';
    },
    async outro() {
      console.log('//outro');
      //return '//outro';
    },
    augmentChunkHash(chunkInfo) {
      console.log('augmentChunkHash');
      if (chunkInfo.name === 'msg') {
        return Date.now().toString();//返回不是hash，而是计算hash的内容
      }
    },
    async renderChunk(code, chunkInfo, options) {
      console.log('renderChunk');
    },
    async generateBundle(options, bundle) {
      let entryName;
      for (let fileName in bundle) {
        let assetOrChunkInfo = bundle[fileName];
        console.log(fileName, assetOrChunkInfo);
        if (assetOrChunkInfo.isEntry) {
          entryName = fileName;
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: 'index.html',
        source: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>vite</title>
                  </head>

                  <body>
                    <div id="app"></div>
                    <script src="${entryName}" type="module"></script>
                  </body>

                  </html>`
      });
    },
    async writeBundle() {
      //写入文件，此钩子会在写入硬盘后触发
      console.log('writeBundle');
    },
    renderError() {
      console.log('renderError');
    },
    closeBundle() {
      console.log('closeBundle');
    }
  }
}
export default generation