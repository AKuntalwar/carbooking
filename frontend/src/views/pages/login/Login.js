import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput, 
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {


  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const hadleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name] : event.target.value}))
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const err = Validation(values);     
      setErrors(err);
      
        axios.post('http://localhost:1234/api/login', values)
          .then(res => {
           
            if (res.data.errors) {
              setBackendError(res.data.errors);
            } else {
              setBackendError([]);
              if (res.data.status==true) {
                navigate('/dashboard');
              } else {
                setErrors({...err,"login":res.data.message});
              }
            }
          })
          .catch(err => console.log("errors",err));            
   
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h4>Admin Login</h4>
                    
                    {errors && Object.values(errors).length?
                  <CAlert color="danger">
                    {
                      Object.values(errors).map(err=><p>{err}</p>)
                    }
                  </CAlert> : null}
                  
                    <CInputGroup className="mb-3">
                  
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      
                      <CFormInput onChange={hadleInput} type="text" placeholder="Username" autoComplete="username" name='username' />
                      
                      
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={hadleInput}
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>                    
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
