import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { Header, Footer, Alert } from 'app/components';
import { ProjectInit } from 'app/components/features/project-init/project-init.component';
import { AlertActions } from 'app/components/shared/alert/alert.actions';
import { CmdActions } from 'app/actions/cmd.action';

export namespace App {
  // Character container property definitions
  export interface Props extends RouteComponentProps<void> {
    pageData: RootState.PageState; // Main data of page
    notification: RootState.NotificationState; // data for notification
    alertActions: AlertActions; // Notification actions
    appStatus: any;
    cmdActions: CmdActions;
  }
}

/**
 * This decorator help component can communicate with Redux
 */
@connect(
  (state: any): Pick<App.Props, any> => {
    return { 
      pageData: state.pageData,
      appStatus: state.appStatus,
      notification: state.notification
    };
  },
  (dispatch: Dispatch): Pick<App.Props, any> => ({
    alertActions: bindActionCreators(omit(AlertActions, 'Type'), dispatch),
    cmdActions: bindActionCreators(omit(CmdActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  checkNpm = () => {
    setTimeout(() => {
      console.log(`clicked!!!!`);
      this.props.cmdActions.checkNaf(true);
    }, 3000);
  }

  componentDidMount() {
    console.log(`app mounted!!!`);
  }

  componentWillReceiveProps() {
    console.log(`App Changed!!!`);
  }

  render() {
    const { alertActions, notification, appStatus } = this.props;
    return (
      <div className="page-wrap">
        <button
          type="button"
          onClick={this.checkNpm}
          className="btn btn-primary"
        >
          Check Npm
        </button>
        <Alert notification={notification} alerter={alertActions} />
        <Header appStatus={appStatus} />
        <div className="container">
          <ProjectInit />
        </div>
        <Footer />
      </div>
    );
  }
}
