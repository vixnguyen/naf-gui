import * as React from 'react';

export namespace Button {
  export interface Props {
    text: string;
    isProcessing?: boolean;
    isAnimated?: boolean;
    className?: string;
    onClick?: void | string;
    checking?: void | string;
    canClick?: boolean;
    onValidate?: any;
  }
}

export class Button extends React.Component<Button.Props> {
  constructor(props: any, context?: any) {
    super(props, context);
  }

  default = () => {
    // to do
  }


  render() {
    const { text, isProcessing, className, canClick, onValidate } = this.props;
    // console.log(onValidate);
    if (typeof onValidate === 'function') {
      onValidate();
    }
    // console.log(`can click`, canClick);
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
