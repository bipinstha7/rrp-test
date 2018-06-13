import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css"
import Header from "../components/Header";
import CounterButton from "../components/CounterButton";

import {setSearchField, requestRobots} from "../actions";
import {connect} from "react-redux";

// mapStateToProps takes state and return an object
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render () {
    const filterRobots = this.props.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
    });
    return this.props.isPending ? <h1>Loading</h1>
    :
    (
      <div className="tc">
        <Header />
        <CounterButton />
        <SearchBox searchChange={this.props.onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filterRobots}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);