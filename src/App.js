import logo from './logo.svg';
import './App.css';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotMail from './ForgotMail';
import PasswordChange from './PasswordChange';
import TemporaryPass from './TemporaryPass';
import CreateUser from './CreateUser';
import AppPage from './AppPage';
import Page from './Page';
import Users from './Users'
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import { UserProvider } from './Context';
import { LeadProvider } from './Context1';
import Leads from './Leads';
import CreateLead from './CreateLead';
import ViewLead from './ViewLead';
import EditLead from './EditLead';
import { ServiceProvider } from './Context2';
import Requests from './ServiceRequest';
import ViewRequest from './ViewRequest';
import EditRequest from './EditRequest';


function App() {
  return (
    <BrowserRouter>
    <ServiceProvider>
    <LeadProvider>
    <UserProvider>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/forgot' element={<ForgotMail/>}/>
      <Route path='/reset' element={<PasswordChange/>}/>
      <Route path='/temp' element={<TemporaryPass/>}/>
      <Route path='/app' element={<AppPage/>}>
      <Route path='page' element={<Page/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='create-user' element={<CreateUser/>}/>
      <Route path='view-user/:id' element={<ViewUser/>}/>
      <Route path='edit-user/:id' element={<EditUser/>}/>
      <Route path='leads' element={<Leads/>}/>
      <Route path='create-lead' element={<CreateLead/>}/>
      <Route path='view-lead/:id' element={<ViewLead/>}/>
      <Route path='edit-lead/:id' element={<EditLead/>}/>
      <Route path='requests' element={<Requests/>}/>
      <Route path='view-request/:id' element={<ViewRequest/>}/>
      <Route path='edit-request/:id' element={<EditRequest/>}/>



      </Route>
    </Routes>
</UserProvider>
</LeadProvider>
</ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
