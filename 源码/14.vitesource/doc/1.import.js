const MagicString = require('magic-string');
const { parse } = require('es-module-lexer');
const hash = require('hash-sum');
(async function (bodyContent) {
  let magicString = new MagicString(bodyContent)
  const imports = await parse(bodyContent);
  if (imports && imports[0].length > 0) {
    imports[0].forEach(({ n, s, e }) => {
      magicString.overwrite(s, e, `/node_modules/.vite/${n}.js?v=${hash(n)}`);
    });
  }
  console.log(magicString.toString());
})(`import { createApp } from 'vue';import React from 'react';`);