import * as React from 'react';

export namespace Footer {
  export interface Props {
    //
  }
}

export class Footer extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <footer className="footer col-12">
        <p>© Vix Nguyen All Rights Reserved</p>
      </footer>
    );
  }
}
