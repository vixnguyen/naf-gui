import * as React from 'react';
import { Toolbar } from 'app/components';

export namespace Header {
  export interface Props {
    //
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <header className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-2 text-left">
              <img className="logo" src={'./assets/images/logo.png'} alt="asiantech" />
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
