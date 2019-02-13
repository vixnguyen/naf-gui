import * as React from 'react';

export namespace Alert {
  export interface Props {
    alerter: any;
    notification: any;
  }
  export interface State {
    cls: string;
  }
}

export interface Alert {
  isOpen: boolean;
  type: string;
  msg: string;
  obj?: any;
  icon?: any;
}

export class Alert extends React.Component<Alert.Props, Alert.State> {
  private timer: any;
  private timerClear: any;

  constructor(props: Alert.Props, context?: any) {
    super(props, context);
    this.state = {
      cls: ''
    };
  }

  hideMe = () => {
    this.setState({
      cls: 'fade-out'
    });
    clearTimeout(this.timer);
    clearTimeout(this.timerClear);
    this.timerClear = setTimeout(() => {
      this.props.alerter.clear();
      clearTimeout(this.timerClear);
    }, 1000);
  };

  showMe = () => {
    clearTimeout(this.timer);
    clearTimeout(this.timerClear);
    this.setState(
      {
        cls: 'fade-in'
      },
      this.autoHide
    );
  };

  autoHide() {
    this.timer = setTimeout(() => {
      this.hideMe();
      clearTimeout(this.timer);
    }, 3000);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.notification.isOpen) {
      this.showMe();
    }
  }

  render() {
    const { type, msg } = this.props.notification;
    return (
      <div className={`alert alert-${type} ${this.state.cls}`}>
        <div className="alert-icon">
          <i className="fa fa-info-circle" aria-hidden="true" />
        </div>
        <div className="alert-content">{msg}</div>
        {/* <div className="alert-close">
          <i className="fa fa-times"></i>
        </div> */}
      </div>
    );
  }
}
