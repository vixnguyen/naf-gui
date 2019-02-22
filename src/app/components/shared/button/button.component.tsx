import * as React from 'react';

export namespace ConfirmDialog {
  export interface Props {
    text: string;
    isProcessing?: boolean;
    isAnimated?: boolean;
    className?: string;
    onClick?: void | string;
    checking?: void | string;
    canClick?: boolean;
  }
}

export class Button extends React.Component<ConfirmDialog.Props> {
  constructor(props: ConfirmDialog.Props, context?: any) {
    super(props, context);
  }

  default = () => {
    // to do
  }

  render() {
    const { text, isProcessing, className, onClick, canClick } = this.props;
    let handleClick: void;
    if (typeof onClick === 'function') {
      handleClick = onClick;
    } else {
      //
    }
    console.log(handleClick);
    return (
      <button
        className={`${className} ${isProcessing ? 'show' : 'hide'}`}
        disabled={isProcessing || !canClick}
        onClick={this.default}
      >
        <span className="animated-icon">
          <i className="fa fa-spinner fa-spin" />
        </span>
        <span className="animated-label">{text}</span>
      </button>
    );
  }
}
