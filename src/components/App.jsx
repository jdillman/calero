import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { appStart } from 'modules/UIModule';
import Selector from 'components/Selector';

import 'css/common/reset.css';
import 'css/common/colors.css';
import 'css/common/base.css';
import 'css/App.css';

function HomeScreen() {
  return <div>Playground</div>;
}

function SelectorScreen() {
  const ActionBox = selectedItems => (
    <div className="action-box">
      <div>{selectedItems.length} selected</div>
      <button onClick={() => (alert(selectedItems.join(',')))}>Click me</button>
    </div>
  );

  return (
    <div>
      <p>Select Ctrl or Shift while clicking on the yellow boxes</p>
      <Selector selectedClass="selected" actionBox={ActionBox}>
        <div className="box" key="test" />
        <div className="box" key="test2" />
        <div className="box" key="test3" />
        <div className="box" key="test4" />
      </Selector>
    </div>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.appStart();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">Header</header>
        <main className="app-main">
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <ul>
              <li><Link to="/components/selector">Selector</Link></li>
            </ul>
          </nav>
          <section className="main-content">
            <Route exact path="/" component={HomeScreen} />
            <Route path="/components/selector" component={SelectorScreen} />
          </section>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ready: state.ui.ready,
  };
}
export default withRouter(connect(mapStateToProps, { appStart })(App));
