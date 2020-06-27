import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loadable from 'react-loadable';
import Loader from "./GlobalComponents/Loader"
import "./App.scss";
import "antd/dist/antd.min.css";
const { Header } = Layout

const loading = () => <Loader/>

const Survey = Loadable({
  loader: () => import('./components/Survey'),
  loading
});

const AdminView = Loadable({
  loader: () => import('./components/Admin'),
  loading
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  render() {
   const { isLoading } = this.state;
   if(isLoading){
     return loading()
   }
    return (
      <BrowserRouter>
        <Layout>
          <Header className="color-white fs-18">Covid-19 Survey</Header>
          <Switch>
            <Route path="/admin" name="Admin" component={AdminView} />
            <Route path="/" name="Survey" component={Survey} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
