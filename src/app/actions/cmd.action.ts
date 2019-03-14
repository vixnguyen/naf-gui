import { createAction } from 'redux-actions';
import { ElectronHelper } from 'app/utils/electron.helper';

const ELECTRON = new ElectronHelper();
const atPath = ELECTRON.electron.remote.app.getPath('desktop');
const cmdFunction = (packageName: string, options: any[], cb: any) => {
  if (ELECTRON.isElectron()) {
    return (dispatch: any) => {
      let npmVersionCmd = ELECTRON.childProcess.spawn(packageName, [...options, ...[atPath]]);
      npmVersionCmd.stdout.on('data', (data: any) => {
        dispatch(cb(true));
      });
      npmVersionCmd.stdout.on('error', (error: any) => {
        //
      });
      npmVersionCmd.on('exit', (code: any) => {
        //
      });
    };  
  } else {
    return true;
  }
}

export namespace CmdActions {
  export enum Type {
    CHECK_NPM = 'CHECK_NPM',
    CHECK_NAF = 'CHECK_NAF',
    CHECK_MONGOD = 'CHECK_MONGOD'
  }
  export const checkNpm = createAction<any>(Type.CHECK_NPM);
  export const checkNaf = createAction<any>(Type.CHECK_NAF);
  export const checkMongod = createAction<any>(Type.CHECK_MONGOD);
  export const getNpmVersion = () => {
    return cmdFunction('npm', ['-v', 'Terminal'], checkNpm);
  };
  export const getNafVersion = () => {
    return cmdFunction('naf', ['help', 'Terminal'], checkNaf);
  };
  export const getMongodVersion = () => {
    return cmdFunction('mongod', ['--version', 'Terminal'], checkMongod);
  };
  export const installNpm = () => {
    return cmdFunction('npm', ['install', 'Terminal'], checkMongod);
  };
  export const installNaf = () => {
    return cmdFunction('npm', ['install -g @vixnguyen/naf', 'Terminal'], checkMongod);
  };
  export const installMongod = () => {
    return cmdFunction('npm', ['install mongod', 'Terminal'], checkMongod);
  };
}

export type CmdActions = Omit<typeof CmdActions, 'Type'>;
