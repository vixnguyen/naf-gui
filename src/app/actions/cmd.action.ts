import { createAction } from 'redux-actions';
import { ElectronHelper } from 'app/utils/electron.helper';

const ELECTRON = new ElectronHelper();
const atPath = ELECTRON.electron.remote.app.getPath('desktop');
const cmdFunction = (packageName: string, options: any[], cb: any = null) => {
  if (ELECTRON.isElectron()) {
    return async (dispatch: any) => {
      let result = ELECTRON.childProcess.spawn(
        packageName,
        options,
        { cwd: atPath }
      );
      result.stdout.on('data', async (data: any) => {
        console.log(`Running...${data}`, );
      });
      await new Promise((resolve: any, reject: any) => {
        result.on('error', async (error: any) => {
          reject('true');
        });
        result.on('exit', (code: number) => {
          dispatch(cb(!code));
          resolve(true);
        });
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
    return cmdFunction('npm', ['-v'], checkNpm);
  };
  export const getNafVersion = () => {
    return cmdFunction('naf', ['help'], checkNaf);
  };
  export const getMongodVersion = () => {
    return cmdFunction('mongod', ['--version'], checkMongod);
  };
  export const installNpm = () => {
    return cmdFunction('npm', ['install'], checkMongod);
  };
  export const installNaf = () => {
    return cmdFunction('npm', ['install', '-g', '@vixnguyen/naf'], checkNaf);
  };
  export const installMongod = () => {
    return cmdFunction('npm', ['install mongod'], checkMongod);
  };
}

export type CmdActions = Omit<typeof CmdActions, 'Type'>;
