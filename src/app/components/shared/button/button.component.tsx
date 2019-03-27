import * as React from 'react';

export namespace Button {
  export interface Props {
    text: string;
    isProcessing?: boolean;
    isAnimated?: boolean;
    className?: string;
    onClick?: any;
    canClick?: boolean;
    img?: string;
    icon?: string;
  }
  export interface State {
    [key: string]: any;
  }
}

export class Button extends React.Component<Button.Props, Button.State> {
  constructor(props: any, context?: any) {
    super(props, context);
    this.state = {
      isProcessing: props.isProcessing
    };
  }

  doIt = () => {
    if (typeof this.props.onClick === 'function') {
      if (this.props.isAnimated) {
        this.setState({
          isProcessing: true
        });
        this.props.onClick().then((data: any) => {
          // success
          this.setState({
            isProcessing: false
          });
        }).finally(() => {
          // finnally
        });
      } else {
        this.props.onClick(true);
      }
    }
  }


  render() {
    const { text, className, canClick, img } = this.props;
    const { isProcessing } = this.state;
    return (
      <button
        className={`${className} ${isProcessing ? 'show' : 'hide'}`}
        disabled={isProcessing || !!canClick}
        onClick={this.doIt}
        title={`Install abc`}
      >
        <span className="animated-icon">
          <i className="fa fa-spinner fa-spin" />
        </span>
        <span className="animated-label">
          {text}
          {
            img ? <img className="img" src={img} alt={text} /> : null
          }
        </span>
      </button>
    );
  }
}
