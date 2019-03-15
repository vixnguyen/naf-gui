import { createAction } from 'redux-actions';
import { ElectronHelper } from 'app/utils/electron.helper';

const ELECTRON = new ElectronHelper();
const atPath = ELECTRON.electron.remote.app.getPath('desktop');
const cmdFunction = (packageName: string, options: any[], cb: any) => {
  if (ELECTRON.isElectron()) {
    return async (dispatch: any) => {
      let npmVersionCmd = ELECTRON.childProcess.spawn(
        packageName,
        options,
        { cwd: atPath }
      );
      await npmVersionCmd.stdout.on('data', (data: any) => {
        // console.log(`Running...${data}`, );
        // dispatch(cb(true));
      });
      await npmVersionCmd.stdout.on('error', (error: any) => {
        // console.log(`Error: ${error}`);
        //
      });
      await npmVersionCmd.on('error', (error: any) => {
        // console.log(`Error: ${error}`);
        //
      });
      await npmVersionCmd.on('exit', (code: any) => {
        // console.log(`Exit: ${code}`);
        // let result = code ? true : false;
        dispatch(cb(!code));
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
