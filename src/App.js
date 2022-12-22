import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { AddProduct } from './Pages/AddProduct';
import { AddUser } from './Pages/AddUser';
import { CreateJobForm } from './Pages/CreateJobForm';

import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { ReadJobForm } from './Pages/ReadJobForm';
import { UserProfile } from './Pages/UserProfile';
import { VisitorDashboard } from './Pages/VisitorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/dashboard' element={< Dashboard />}></Route>
        <Route exact path='/user/profile/:id' element={< UserProfile />}></Route>
        <Route exact path='/dashboard/visitor' element={< VisitorDashboard />}></Route>
        <Route exact path='/user/job/create' element={< CreateJobForm />}></Route>
        <Route exact path='/user/job/read/:id' element={< ReadJobForm />}></Route>
        <Route exact path='/admin/new-product' element={< AddProduct />}></Route>
        <Route exact path='/admin/new-user' element={< AddUser />}></Route>
      </Routes>
    </Router>
  )
}

export default App;