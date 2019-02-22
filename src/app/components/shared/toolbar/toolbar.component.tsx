import * as React from 'react';
import { ElectronHelper } from 'app/utils/electron.helper';
import { Button } from 'app/components/shared/button/button.component';

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
        <Button
          isAnimated={true}
          canClick={!this.state.hasNpm}
          text={`Install Npm`}
          className={`btn btn-outline btn-default btn-animated btn-square`}
        />
        <Button
          isAnimated={true}
          canClick={!this.state.hasNaf}
          text={`Install Naf`}
          className={`btn btn-outline btn-default btn-animated btn-square`}
        />
        <Button
          isAnimated={true}
          canClick={!this.state.hasMongod}
          text={`Install Dependences`}
          className={`btn btn-outline btn-default btn-animated btn-square btn-lg`}
        />
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
