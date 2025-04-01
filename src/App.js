import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  // Store your API key here or in .env file
  apiKey = 'pub_63148fe489bb146e68fa91476f1998364851d'; // Your API key
  
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="general" pageSize={15} category="general" apiKey={this.apiKey} />} />
            <Route path="/business" element={<News key="business" pageSize={15} category="business" apiKey={this.apiKey} />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={15} category="entertainment" apiKey={this.apiKey} />} />
            <Route path="/general" element={<News key="general" pageSize={15} category="general" apiKey={this.apiKey} />} />
            <Route path="/health" element={<News key="health" pageSize={15} category="health" apiKey={this.apiKey} />} />
            <Route path="/science" element={<News key="science" pageSize={15} category="science" apiKey={this.apiKey} />} />
            <Route path="/sports" element={<News key="sports" pageSize={15} category="sports" apiKey={this.apiKey} />} />
            <Route path="/technology" element={<News key="technology" pageSize={15} category="technology" apiKey={this.apiKey} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}