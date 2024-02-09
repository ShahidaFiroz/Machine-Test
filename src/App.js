
import './App.css';
import 'bootstrap';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Tasks from './pages/tasks';
import Add from './pages/addTasks';
import Update from './pages/updateTask';
import "./style.css"
import ListTasks from './pages/listTask';
import SingleTaskView from './pages/tasks';
// import Student from './student';
// import Test from './task';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
<Route path='/' element={<ListTasks/>}></Route>
<Route path="/task/:id" element={<SingleTaskView/>}></Route>
<Route path='/add' element={<Add/>}></Route>
<Route path='/update/:id' element={<Update/>}></Route>


      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
