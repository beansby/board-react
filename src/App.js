import './App.css';
import WriteBoard from './component/WriteBoard';
import DetailBoard from './component/DetailBoard';
import ListBoard from './component/ListBoard';
import DetailBoardFunc from './component/DetailBoardFunc';
import {Route, Routes} from 'react-router-dom'
import Header from './component/Header';
import UpdateBoard from './component/UpdateBoard';
import DeleteBoard from './component/DeleteBoard';
import PageListBoard from './component/PageListBoard';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        {/* 연결해줄 url */}
        {/* <Route exact path='/' element={ <ListBoard/>}/> */}
        <Route exact path='/' element={ <PageListBoard/>}/>
        
        <Route exact path='/write' element={<WriteBoard/>}/>
        <Route exact path='/detail' element={<DetailBoard/>}/>
        <Route exact path='/detail2/:id' element={<DetailBoardFunc/>}/>
        <Route exact path='/update/:id' element={<UpdateBoard/>}/>
        <Route exact path='/delete/:id' element={<DeleteBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
