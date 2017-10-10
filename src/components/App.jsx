import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { appStart } from 'modules/UIModule';

import ItemScreen from 'components/screens/ItemScreen';
import Selector from 'components/Selector';

import 'css/common/reset.css';
import 'css/common/colors.css';
import 'css/common/base.css';
import 'css/App.css';

function HomeScreen() {
  return (
    <Selector>
      <span id="test">test</span>
      <span id="foo">foo</span>
      <span id="bar">bar</span>
      <span id="baz">baz</span>
    </Selector>
  );
}

class App extends React.Component {
  componentDidMount() {
    // this.props.appStart();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">Header</header>
        <main className="app-main">
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/item">Item</Link>
            <ul>
              <Link to="/item/123">123</Link>
              <Link to="/item/abc">abc</Link>
            </ul>
          </nav>
          <section className="main-content">
            <Route exact path="/" component={HomeScreen} />
            <Route path="/item/:itemId" component={ItemScreen} />
            <Route
              path="/item"
              exact
              render={() => (
                <span>No Item selected</span>
              )}
            />
          </section>
        </main>
        <footer className="app-footer">Footer</footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ready: state.ui.ready,
  };
}
export default connect(mapStateToProps, { appStart })(App);
