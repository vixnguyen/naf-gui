import * as React from 'react';
import { ProjectInitForm } from './form.component';

export namespace ProjectInit {
  export interface Props {
    //
  }
  export interface State {
    //
  }
}

export class ProjectInit extends React.Component<ProjectInit.Props, ProjectInit.State> {

  constructor(props: ProjectInit.Props, state: ProjectInit.State) {
    super(props, state);
  }

  render() {
    return (
      <section className="main">
        <h1>Welcome to Naf GUI</h1>
        <div>The Naf GUI makes it easy to create an application that already works, right out of the box. It already follows our best practices.</div>
        <ProjectInitForm />
      </section>
    );
  }
}
