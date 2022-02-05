import React from 'react';
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import { Container, Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Dropdown from 'react-bootstrap/Dropdown'

import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PastJobs from './pages/PastJobs';
import ConvertPlaylist from './pages/ConvertPlaylist';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: 'Samuel Tracz',
      headerLinks: [
        {title:'Home', path: '/'},
        {title:'About', path: '/about'},
        {title:'Past Jobs', path: '/work'},
        {title:'Playlist Converter', path: '/convert'}
      ],
      home: {
        title: 'Hard working',
        subTitle: 'making a difference',
        text: 'Check me out below'
      },
      about: {
        title: 'About Me'
      },
      contact: {
        title: 'Previous Jobs'
      },
      convert: {
        title: 'Playlist Converter',
        subTitle: 'Minimal Viable Product',
        text: "Currently from Spotify to Youtube only"
      }
    }
  }
  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <NavbarBrand>Samuel Tracz</NavbarBrand>
            <NavbarToggle className="border-0" aria-controls="navbar-toggle"></NavbarToggle>
            <NavbarCollapse id="navbar-toggle">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="about">About</Link>
                <Link className="nav-link" to="work">Past Jobs</Link>
                <Dropdown>
                  <Dropdown.Toggle>
                    Projects
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link className="nav-link" to="convert">Playlist Converter</Link>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Nav>
            </NavbarCollapse>
          </Navbar>

          <Route path="/" exact render={() => <HomePage title={this.state.home.title} subTitle={this.state.home.subTitle} text={this.state.home.text} />} />
          <Route path="/about" render={() => <AboutPage title={this.state.about.title} />} />
          <Route path="/work" render={() => <PastJobs title={this.state.contact.title} />} />
          <Route path="/convert" render={() => <ConvertPlaylist title={this.state.convert.title} subTitle={this.state.convert.subTitle} text={this.state.convert.text} />} />

          <Footer></Footer>

        </Container>
      </Router>
    );
  }
  
}

export default App;
