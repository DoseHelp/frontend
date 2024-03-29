import React, {useReducer}from 'react'
// import Navigation from './Navigation'
import Patients from './Patients'
import PatientForm from './PatientForm'
import PatientUpdate from './PatientUpdate'
import DispenseForm from './DispenseForm' 
import DispenseFormPatientPx from './DispenseFormPatientPx'
import Manage from './Manage'
import Reports from './Reports'
import Help from './Help'
import Landing from './Landing'
import LoginForm from './LoginForm'
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import NotFound from './NotFound'
import { reducer } from '../utils/reducer'
import { StateContext } from '../utils/stateContext' 
import SignupForm from './SignupForm'
import ResponsiveAppBar from './ResponsiveAppBar'
import  'antd/dist/antd.min.css'
import PatientDetail from './PatientDetails'
import DispenseFormPatient from './DispenseFormPatient'

const App = () => {
  //to have the user allover the app
  const initialState = {
    patientList: [],
    loggedInUser: window.sessionStorage.getItem("username"),
    userID: window.sessionStorage.getItem("userID") || "",
    token: window.sessionStorage.getItem("token") || null
  }
  const [store, dispatch] = useReducer(reducer, initialState)
  const {loggedInUser} = store
  const {patientList } = store
  
  //to get the data from api async
  
return (
    
  <div>
   
     
    {/* <Patients patientList ={patientList}/>
    <DispenseForm/>
    <Manage loggedInUser={loggedInUser} addPatient={addPatient}/>
    <Reports/>
    <Help/>
    {!loggedInUser && <LoginForm activeUser={activeUser}/>} */}
    <StateContext.Provider value={{store, dispatch}}>
      
      <Router>
      <ResponsiveAppBar /> 
            <Routes>
              <Route path="/" element={loggedInUser ? <Navigate replace to="/landing"/> : <Navigate to="login"/>} />

              <Route path="patients">
                  <Route index element={loggedInUser ? <Patients/> :  <Navigate to="/login" />}/>
                  <Route path="new" element= {loggedInUser ?<PatientForm loggedInUser={loggedInUser}/> : <Navigate to="/login" />} />
                <Route path=":patientID" >
                  <Route index element={ loggedInUser? <PatientDetail/> : <Navigate to="/login" />}/>
                  <Route path = "edit" element={ loggedInUser?  <PatientUpdate />   : <Navigate to="/login" />  } />       
              </Route>
              </Route>  
              <Route path="help" element={<Help />} />
              <Route path="dispense" loggedInUser={loggedInUser} patientList={patientList}>
                <Route  index element={loggedInUser? <DispenseForm/> : <Navigate to="/login"/>}/>
                <Route path= ":patientID" element={loggedInUser ? <DispenseFormPatient/> : <Navigate to="/login" />} />
                <Route path= ":patientID/:pxID" element={loggedInUser ? <DispenseFormPatientPx/> : <Navigate to="/login" />} />
              </Route> 
              <Route path="manage" element={<Manage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="landing" element={<Landing />} />
             
              <Route path="signup" element={<SignupForm />} />
              <Route path="login" element={<LoginForm />} />
              <Route path = "logout" element= {<Navigate replace to="/login"/>}/>
              <Route path="home" element={<Navigate replace to="/landing"/>} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
      </Router>
    </StateContext.Provider> 
    

  </div>
  )
}

export default App
