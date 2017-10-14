import React from 'react';

class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionBox: false,
      selected: props.selected || [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  // group select
  shiftClick(key) {
    const keys = [];
    const children = this.props.children;
    const found = children.findIndex(child => child.key === key);
    // eslint-disable-next-line
    for (let x = found; x >= 0; x--) {
      if (this.state.selected.indexOf(children[x].key) !== -1) {
        break;
      }
      keys.push(children[x].key);
    }

    return keys;
  }

  itemClick = key => (event) => {
    if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
      return;
    }
    event.preventDefault();
    let selected = this.state.selected;
    const found = selected.indexOf(key);
    if (found === -1) {
      const ids = event.shiftKey
        ? this.shiftClick(key)
        : key;
      selected = selected.concat(ids);
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
    this.setState({ showActionBox: false });
  }

  keyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        this.clearSelected();
        break;
      case 'Control':
        this.setState({ showActionBox: true });
        document.addEventListener('keyup', this.ctrlRelease);
        break;
      default:
    }
  }

  // Built an array of LIs of all the children passed in
  renderSelectorItems(items) {
    return items.reduce((list, item) => {
      const key = item.key;
      if (!key) {
        console.log('Missing key on child of <Selector>, skipping');
        return list;
      }

      const itemProps = {
        key,
        onClick: this.itemClick(key),
        className: 'selector-item',
      };

      if (this.state.selected.indexOf(key) !== -1) {
        if (this.props.style) {
          itemProps.style = this.props.style;
        }
        if (this.props.activeClass) {
          itemProps.className += ` ${this.props.activeClass}`;
        }
      }

      list.push(<li {...itemProps}>{item}</li>);
      return list;
    }, []);
  }

  renderActionBox() {
    return this.props.actionBox(this.state.selected);
  }

  render() {
    const itemList = this.renderSelectorItems(this.props.children);
    if (!itemList) {
      return null;
    }

    return (
      <div className="selector">
        <ul>{ itemList }</ul>
        { this.props.actionBox && this.renderActionBox() }
      </div>
    );
  }
}

export default Selector;
