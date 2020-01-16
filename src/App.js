import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import Footer from "./components/Footer";
import Join from "./components/Join";
import Login from "./components/Login";

import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";

class App extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:4000/api/video/all");
    const {
      result: { videos }
    } = data;
    this.setState({ data: videos });
    console.log(this.state.data);
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header />

        <div className="content">
          <Switch>
            <Route path="/join" component={Join} />
            <Route path="/login" component={Login} />
            <Route path="/" render={props => <VideoList videos={data} />} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
