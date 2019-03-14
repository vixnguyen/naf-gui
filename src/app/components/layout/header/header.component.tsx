import * as React from 'react';
import { Toolbar } from 'app/components';

export namespace Header {
  export interface Props {
    //
  }
  export interface State {
    //
  }
}

export class Header extends React.Component<Header.Props, Header.State> {
  constructor(props: Header.Props, state: Header.State) {
    super(props, state);
  }

  render() {
    return (
      <header className="page-header col-2">
        <div className="header-top">
          <img className="logo" src={'./assets/images/logo.png'} alt="Naf" />
        </div>
        <div className="header-toolbar">
          <Toolbar />
        </div>
      </header>
    );
  }
}
