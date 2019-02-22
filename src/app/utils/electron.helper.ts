// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
// import { ipcRenderer, webFrame, remote } from 'electron';
import { webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
// import * as fs from 'fs';

declare global {
  interface Window {
    [key: string]: any;
  }
}

export class ElectronHelper {

  // ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  // fs: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      const electron = window.require('electron');
      // this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = electron.webFrame;
      this.remote = electron.remote;
      this.childProcess = window.require('child_process');
      // this.fs = window.require('fs');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}