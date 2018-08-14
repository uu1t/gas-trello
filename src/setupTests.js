const fs = require('fs');
const path = require('path');
const vm = require('vm');

const globalContext = vm.createContext(global);

const content = fs.readFileSync(path.join(__dirname, 'index.js'));
vm.runInContext(content, globalContext, { filename: 'index.js' });
