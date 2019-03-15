import * as React from 'react';
import { CmdActions } from 'app/actions/cmd.action';
import { CommonActions } from 'app/actions/common.action';
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
    commonActions: bindActionCreators(omit(CommonActions, 'Type'), dispatch),
    cmdActions: bindActionCreators(omit(CmdActions, 'Type'), dispatch),
  })
)

export class Toolbar extends React.Component<Toolbar.Props, Toolbar.State> {

  constructor(props: Toolbar.Props, state: Toolbar.State) {
    super(props, state);
    // env verifying
    props.cmdActions.getNpmVersion();
    props.cmdActions.getNafVersion();
    props.cmdActions.getMongodVersion();
  }

  toogleForm = () => {
    this.props.commonActions.toogleForm(true);
  }

  render() {
    let { appStatus, cmdActions } = this.props;
    return (
      <section className="toolbar">
        <Button
          isAnimated={true}
          canClick={appStatus.hasNpm}
          text={`Install`}
          onClick={cmdActions.installNpm}
          img={`./assets/images/resources/node.png`}
          className={`btn btn-outline btn-default btn-animated btn-block`}
        />
        <Button
          isAnimated={true}
          canClick={appStatus.hasNaf}
          text={`Install`}
          onClick={cmdActions.installNaf}
          img={`./assets/images/resources/naf-circle.png`}
          className={`btn btn-outline btn-default btn-animated btn-block`}
        />
        <Button
          isAnimated={true}
          canClick={appStatus.hasMongod}
          text={`Install`}
          onClick={cmdActions.installMongod}
          img={`./assets/images/resources/mongodb.png`}
          className={`btn btn-outline btn-default btn-animated btn-block`}
        />
        <Button
          isAnimated={true}
          canClick={!appStatus.hasNaf}
          text={``}
          onClick={cmdActions.installMongod}
          img={`./assets/images/resources/new-project.png`}
          className={`btn btn-outline btn-default btn-animated btn-block`}
        />
      </section>
    );
  }
}
