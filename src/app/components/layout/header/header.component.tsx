import * as React from 'react';
// import { Link } from 'react-router';

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
          <div className="center-text">
            {/* <Link to="/about">
              <img alt="asiantech" src={"../assets/images/logo.png"}>
            </Link> */}
            <a href={'/about'}>
              <img className="logo" src={'./assets/images/logo.png'} alt="asiantech" />
            </a>
          </div>
        </div>
      </header>
    );
  }
}
