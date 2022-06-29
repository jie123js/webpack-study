
function createHash() {
  return require('crypto').createHash('md5');
}

//入口
let entry = {
  entry1: 'entry1',
  entry2: 'entry2'
}

let entry1Content = 'require depModule1';
let entry2Content = 'require depModule2';

let depModule1Contents = 'depModule1';
let depModule2Content = 'depModule2';

let hash = createHash()
  .update(entry1Content)
  .update(entry2Content)
  .update(depModule1Contents)
  .update(depModule2Content)
  .digest('hex')
console.log('hash', hash);

//chunkHash
let entry1ChunkHash = createHash()
  .update('entry1Content')
  .update('depModule1Contents')
  .digest('hex')
console.log('entry1ChunkHash', entry1ChunkHash);

let entry2ChunkHash = createHash()
  .update('entry2Content')
  .update('depModule2Content')
  .digest('hex')
console.log('entry2ChunkHash', entry2ChunkHash);


let entry1ContentHash = createHash()
  .update(entry1Content)
  .update(depModule1Contents)
  .digest('hex')
console.log('entry1ContentHash', entry1ContentHash);

let entry2ContentHash = createHash()
  .update(entry2Content)
  .update(depModule2Content)
  .digest('hex')
console.log('entry2ContentHash', entry2ContentHash);
