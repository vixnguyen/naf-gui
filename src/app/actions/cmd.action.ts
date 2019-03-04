import { createAction } from 'redux-actions';
import { ElectronHelper } from 'app/utils/electron.helper';

const ELECTRON = new ElectronHelper();

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
    if (ELECTRON.isElectron()) {
      return (dispatch: any) => {
        const atPath = ELECTRON.electron.remote.app.getPath('desktop');
        let npmVersionCmd = ELECTRON.childProcess.spawn('npm', ['-v', 'Terminal', atPath]);
        npmVersionCmd.stdout.on('data', (data: any) => { 
          dispatch(checkNpm(true));
        });
      };  
    } else {
      return true;
    }
    
  };
}

export type CmdActions = Omit<typeof CmdActions, 'Type'>;
