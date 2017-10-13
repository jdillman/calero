import React from 'react';

class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forceShow: false,
      selected: props.selected || [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }

  gatherSelectedItems(event, id) {
    const ids = [];
    // multiselect with shift
    if (event.shiftKey) {
      const children = this.props.children;
      // eslint-disable-next-line
      for (let x = 0; x <= children.length; x++) {
        if (children[x].props.id === id) {
          break;
        }
        ids.push(children[x].props.id);
      }
    }
    ids.push(id);
    return ids;
  }

  // toggle selected state
  itemClick = id => (event) => {
    event.preventDefault();
    if (!(event.ctrlKey || event.shiftKey)) {
      return;
    }

    let selected = this.state.selected;
    const found = selected.indexOf(id);
    if (found === -1) {
      selected = selected.concat(this.gatherSelectedItems(event, id));
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

  renderSelectedCount() {
    return (<div className="wrapper">
      <p className="selected-count">
        <span>{ this.state.selected.length } items selected</span>
      </p>
    </div>);
  }

  render() {
    const itemList = this.renderSelectorItems(this.props.children);
    if (!itemList) {
      return null;
    }

    const selectedCount = (itemList.count > 0 || this.state.forceShow)
      ? this.renderSelectedCount(this.state.selected)
      : null;

    return (
      <div className="selector">
        <ul>{ itemList }</ul>
        { selectedCount }
      </div>
    );
  }
}

export default Selector;
