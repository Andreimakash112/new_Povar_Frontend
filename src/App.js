import React,{useState} from 'react';
import './App.css';
import Main from './view/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Info from './view/Info';
function App() {
 const [page,setPage]=useState('Main');
  const pages={
    Main:<Main/>,
    Info:<Info/>,
  }

  return (
    <div className="App">
    <Header setPage={setPage}/>
{pages[page]}
  <Footer/>
    </div>
  );
}


export default App;
