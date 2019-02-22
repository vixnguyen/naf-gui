import * as React from 'react';
import { ElectronHelper } from 'app/utils/electron.helper';

export namespace Toolbar {
  export interface Props {
    //
  }
  export interface State {
    hasNpm: boolean;
    hasMongod: boolean;
    hasNaf: boolean;
  }
}

export class Toolbar extends React.Component<Toolbar.Props, Toolbar.State> {

  electron: any;
  spawn: any;
  app: any;

  constructor(props: Toolbar.Props, state: Toolbar.State) {
    super(props, state);
    this.electron = new ElectronHelper();
    this.spawn = this.electron.childProcess.spawn;
    const { app } = this.electron.remote;
    this.app = app;
    this.state = {
      hasNpm: false,
      hasMongod: false,
      hasNaf: false
    };
  }

  componentWillMount() {
    this.checkNpm();
    this.checkMongod();
    this.checkNaf();
  }

  doIt() {
    //
  }

  projectInitiation() {
    //to do
  }

  checkNpm() {
    const atPath = this.app.getPath('desktop');
    let npmVersionCmd = this.spawn('npm', ['-v', 'Terminal', atPath]);
    npmVersionCmd.stdout.on('data', (data: any) => { 
      this.setState({
        hasNpm: true
      });
    });
    // npmVersionCmd.stdin.on('data', (data: any) => { 
    //   console.log (`data in: ${data}`);
    // });
    // npmVersionCmd.stderr.on('error', (err: any) => { 
    //   console.log (err);
    // });
  }

  checkMongod() {
    const atPath = this.app.getPath('desktop');
    let npmVersionCmd = this.spawn('mongod', ['--version', 'Terminal', atPath]);
    npmVersionCmd.stdout.on('data', (data: any) => { 
      this.setState({
        hasMongod: true
      });
    });
  }

  checkNaf() {
    const atPath = this.app.getPath('desktop');
    let npmVersionCmd = this.spawn('naf', ['help', 'Terminal', atPath]);
    npmVersionCmd.stdout.on('data', (data: any) => { 
      this.setState({
        hasNaf: true
      });
    });
  }

  render() {
    return (
      <section className="btn-group text-right">
        <button
          type="button"
          onClick={this.doIt}
          className="btn btn-outline btn-default btn-square"
          disabled={this.state.hasNpm}
        >
          Install Npm
        </button>
        <button
          type="button"
          onClick={this.doIt}
          className="btn btn-outline btn-default btn-square"
          disabled={this.state.hasNaf}
        >
          Install Naf
        </button>
        <button
          type="button"
          onClick={this.doIt}
          className="btn btn-outline btn-default btn-square btn-lg"
          disabled={this.state.hasMongod}
        >
          Install Dependences
        </button>
        <button
          type="button"
          onClick={this.doIt}
          className="btn btn-outline btn-default btn-square"
        >
          Project Initiation
        </button>
      </section>
    );
  }
}
