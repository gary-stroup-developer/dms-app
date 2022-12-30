import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { AddProduct } from './Pages/AddProduct';
import { AddUser } from './Pages/AddUser';
import { CBR } from './Pages/CBR';
import { CCR } from './Pages/CCR';
import { CreateJobForm } from './Pages/CreateJobForm';
import { CryoTank } from './Pages/CryoTank';

import { Dashboard } from './Pages/Dashboard';
import { FSR } from './Pages/FSR';
import { Login } from './Pages/Login';
import { ReadJobForm } from './Pages/ReadJobForm';
import { UserProfile } from './Pages/UserProfile';
import { VisitorDashboard } from './Pages/VisitorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/dashboard/:role' element={< Dashboard />}></Route>
        <Route exact path='/dashboard/visitor' element={< VisitorDashboard />}></Route>
        <Route exact path='/user/profile/:id' element={< UserProfile />}></Route>
        <Route exact path='/user/job/create' element={< CreateJobForm />}></Route>
        <Route exact path='/user/job/read/:id' element={< ReadJobForm />}></Route>
        <Route exact path='/user/fsr/:id' element={<FSR />}></Route>
        <Route exact path='/user/cbr/:id' element={<CBR />}></Route>
        <Route exact path='/user/cbr/:id' element={<CCR />}></Route>
        <Route exact path='/user/inventory/:id' element={<CryoTank />}></Route>
        <Route exact path='/admin/new-product' element={< AddProduct />}></Route>
        <Route exact path='/admin/new-user' element={< AddUser />}></Route>
      </Routes>
    </Router>
  )
}

export default App;