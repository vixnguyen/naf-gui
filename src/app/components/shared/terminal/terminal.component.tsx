import * as React from 'react';

export namespace Terminal {
  export interface Props {
    [key: string]: any;
  }
  export interface State {
    [key: string]: any;
  }
}

export class Terminal extends React.Component<Terminal.Props, Terminal.State> {

  constructor(props: Terminal.Props, state: Terminal.State) {
    super(props, state);
  }

  render() {
    return (
      <section className="terminal">
        <strong>$</strong> > Terminal
      </section>
    );
  }
}
