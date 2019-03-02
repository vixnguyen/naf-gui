// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
// import { ipcRenderer, webFrame, remote } from 'electron';
// import * as childProcess from 'child_process';
// import * as fs from 'fs';

declare global {
  interface Window {
    [key: string]: any;
  }
}

export class ElectronHelper {

  electron: any;
  childProcess: any;
  // fs: typeof fs;

  constructor(a?: any) {
    // Conditional imports
    if (this.isElectron()) {
      this.electron = window.require('electron');
      this.childProcess = window.require('child_process');
    }
    
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}