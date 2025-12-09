import React,{useState} from 'react';
import './App.css';
import Main from './view/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Info from './view/Info';
import Bas from './view/Bas';


import ModalBox from './components/RegAut/ModalBox';
import Login from './components/RegAut/Login';
import Registration from './components/RegAut/Registration';

function App() {

  const[modalBox, setModalBox] = useState('none')
  const [token, setToken] = useState(localStorage.getItem('token'))


  const modalBoxes = {
  none: null,
  login:<ModalBox setModalBox={setModalBox}><Login /></ModalBox>,
  Registration:<ModalBox setModalBox={setModalBox}><Registration /></ModalBox >
 
}

  
 const [page,setPage]=useState('Main');
  const pages={
    Main:<Main/>,
    Info:<Info />,
    Bas:<Bas />,
   
  }

  return (
    <div className="App">
    <Header setPage={setPage}setModalBox={setModalBox} token={token}settoken={setToken} />
{pages[page]}
{ modalBoxes[modalBox] }
  <Footer/>
  
    </div>
  );
}


export default App;
