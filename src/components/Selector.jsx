import React from 'react';

class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forceShow: false,
      show: false,
      selected: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  // toggle selected state
  itemClick = id => () => {
    let selected = this.state.selected;
    const found = selected.indexOf(id);

    if (found === -1) {
      selected = selected.concat([id]);
    } else {
      selected.splice(found, 1);
    }

    this.setState({ selected });
  }

  clearSelected = () => {
    this.setState({ selected: [] });
  }

  ctrlRelease = () => {
    document.removeEventListener('keyup', this.ctrlRelease);
    this.setState({ forceShow: false });
  }

  keyDown = (e) => {
    switch (e.key) {
      case 'Shift':
        // Todo select all to this one
        break;
      case 'Escape':
        this.clearSelected();
        break;
      case 'Control':
        this.setState({ forceShow: true });
        document.addEventListener('keyup', this.ctrlRelease);
        break;
      default:
    }
  }

  // Built an array of LIs of all the children passed in
  renderSelectorItems(items) {
    return items.reduce((list, item) => {
      const id = item.props.id;
      if (!id) {
        console.log('Missing Id on child of <Selector>, skipping');
        return list;
      }

      const itemProps = {
        key: id,
        onClick: this.itemClick(id),
        className: 'selector-item',
      };

      if (this.state.selected.indexOf(id) !== -1) {
        itemProps.style = { fontWeight: 'bold', color: 'darkblue' }; // temp debug
        itemProps.className += ' selected';
      }

      list.push(<li {...itemProps}>{item.props.children}</li>);
      return list;
    }, []);
  }

  render() {
    const itemList = this.renderSelectorItems(this.props.children);
    if (!itemList) {
      return null;
    }

    return (
      <div className="selector">
        <ul>{ itemList }</ul>
        <div className="wrapper">
          <p className="selected-count">
            <span>{ this.state.selected.length } items selected</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Selector;
