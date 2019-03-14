import * as React from 'react';

export namespace Welcome {
  export interface Props {
    isVisible: boolean;
    //
  }
  export interface State {
    //
  }
}

export class Welcome extends React.Component<Welcome.Props, Welcome.State> {

  constructor(props: Welcome.Props, state: Welcome.State) {
    super(props, state);
  }

  render() {
    return this.props.isVisible ? (
      <section className="text-left">
        <h1>Welcome to Naf GUI</h1>
        <div>The Naf GUI makes it easy to create an application that already works, right out of the box. It already follows our best practices.</div>
        <div>Are you ready to discovery it now?</div>
      </section>
    ) : null;
  }
}
