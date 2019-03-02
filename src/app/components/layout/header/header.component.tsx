import * as React from 'react';
import { Toolbar } from 'app/components';

export namespace Header {
  export interface Props {
    appStatus: any;
    //
  }
  export interface State {
    appStatus: any;
  }
}

export class Header extends React.Component<Header.Props, Header.State> {
  constructor(props: Header.Props, state: Header.State) {
    super(props, state);
    this.state = {
      appStatus: {}
    };
  }

  componentWillReceiveProps(data: any) {
    console.log(`header Changed!!!`);
    this.setState({
      appStatus: data
    });
  }

  render() {
    return (
      <header className="page-header">
        <div className="container">
          <div>Npm: {`${this.state.appStatus.hasNpm}`}</div>
          <div className="row">
            <div className="col-2 text-left">
              <img className="logo" src={'./assets/images/logo.png'} alt="Naf" />
            </div>
            <div className="col-10 text-right">
              <Toolbar />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
