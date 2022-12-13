// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



export default class App extends Component {
  pageSize=15;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  render() {
    return (
      <div>
      <Router>
        <Navbar/>
        {/* <News/> */}
        {/* <News pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="sports" /> */}
        <Routes>
          <Route path="/Home" element={<News key="general" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="general"/>}/>Home
          <Route path="/general" element={<News key="general" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="general"/>} />General
          <Route path="/business" element={<News key="business" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="business"/>} />Business
          <Route path="/entertainment" element={<News key="entertainment" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="entertainment"/>} />Entertainment
          <Route path="/health" element={<News key="health" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="health"/>} />Health
          <Route path="/science" element={<News key="science" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="science"/>} />Science
          <Route path="/sports" element={<News key="sports" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="sports"/>} />Sports
          <Route path="/technology" element={<News key="technology" pagesize={this.pageSize} apiKey={this.apiKey} country="in" category="technology"/>} />Technology
        </Routes>
       </Router>
      </div>      
    )
  }
}
