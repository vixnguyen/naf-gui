import * as React from 'react';

export namespace ConfirmDialog {
  export interface Props {
    isProcessing: boolean;
    isAnimated: boolean;
  }
}

export class Button extends React.Component<ConfirmDialog.Props> {
  constructor(props: ConfirmDialog.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { isProcessing } = this.props;
    return (
      <button
        className={`btn btn-primary btn-animated ${
          isProcessing ? 'show' : 'hide'
        }`}
        disabled={isProcessing}
      >
        <span className="animated-icon">
          <i className="fa fa-spinner fa-spin" />
        </span>
        <span className="animated-label">Initialize</span>
      </button>
    );
  }
}
