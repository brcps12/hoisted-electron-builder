const ipcRenderer = require('electron').ipcRenderer;

const moduleA = document.getElementById('moduleA');
const moduleB = document.getElementById('moduleB');

ipcRenderer.send('getMessageA');
ipcRenderer.send('getMessageB');

ipcRenderer.on('messageA', (event, data) => {
  moduleA.innerText = data;
  console.log(data);
});

ipcRenderer.on('messageB', (event, data) => {
  moduleB.innerText = data;
  console.log(data);
});
