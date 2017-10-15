import React from 'react';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onClick = (event) => {
    const { url, onClick } = this.props;
    const init = { method: 'GET', mode: 'no-cors' };

    if (onClick) {
      const ret = onClick(event, this.button);
      if (ret === false) {
        return;
      }
    }

    fetchAction(
      url,
      init,
      {},
    );
  }

  render() {
    return (
      <button
        ref={(node) => { this.button = node; }}
        onClick={this.onClick}
        className="action-box"
      >{this.props.children}</button>
    );
  }
}

export default ActionButton;

function fetchAction(url, init = {}) {
  const jsonHandler = response => response.json();

  return fetch(url, init).then(jsonHandler)
    .then((resp) => {
      console.log('received response');
      console.log(resp);
    }).catch((msg) => {
      console.log(msg);
    });
}
