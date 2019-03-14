import * as React from 'react';
import { Form } from './form.component';
import { Welcome } from './welcome.component';
import { Terminal } from 'app/components/shared/terminal/terminal.component';

export namespace Main {
  export interface Props {
    pageData: any;
    //
  }
  export interface State {
    //
  }
}

export class Main extends React.Component<Main.Props, Main.State> {

  constructor(props: Main.Props, state: Main.State) {
    super(props, state);
  }

  render() {
    let { pageData } = this.props;
    return (
      <section className="main">
        <Welcome isVisible={pageData.isWelcome} />
        <Terminal  />
        <Form isVisible={pageData.isProjectInit} />
      </section>
    );
  }
}
