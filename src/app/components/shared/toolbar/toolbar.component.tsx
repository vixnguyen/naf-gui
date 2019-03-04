import * as React from 'react';
import { CmdActions } from 'app/actions/cmd.action';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { omit } from 'app/utils';
import { Button } from 'app/components/shared/button/button.component';

export namespace Toolbar {
  export interface Props {
    [key: string]: any;
  }
  export interface State {
    [key: string]: any;
  }
}

/**
 * This decorator help component can communicate with Redux
 */
@connect(
  (state: any): Pick<Toolbar.Props, any> => {
    return { 
      appStatus: state.appStatus
    };
  },
  (dispatch: Dispatch): Pick<Button.Props, any> => ({
    cmdActions: bindActionCreators(omit(CmdActions, 'Type'), dispatch)
  })
)

export class Toolbar extends React.Component<Toolbar.Props, Toolbar.State> {

  constructor(props: Toolbar.Props, state: Toolbar.State) {
    super(props, state);
  }

  // componentWillMount() {
  //   //
  // }

  render() {
    let { appStatus, cmdActions } = this.props;
    return (
      <section className="btn-group text-right">
        <Button
          isAnimated={true}
          canClick={!!appStatus.hasNpm}
          onValidate={cmdActions.getNpmVersion}
          text={`Install Npm`}
          className={`btn btn-outline btn-default btn-animated btn-square`}
        />
        <Button
          isAnimated={true}
          canClick={!!appStatus.hasNaf}
          onValidate={cmdActions.checkNaf}
          text={`Install Naf`}
          className={`btn btn-outline btn-default btn-animated btn-square`}
        />
        <Button
          isAnimated={true}
          canClick={!!appStatus.hasMongod}
          onValidate={cmdActions.checkMongod}
          text={`Install Dependences`}
          className={`btn btn-outline btn-default btn-animated btn-square btn-lg`}
        />
        <button
          type="button"
          className="btn btn-outline btn-default btn-square"
        >
          Project Initiation
        </button>
      </section>
    );
  }
}
