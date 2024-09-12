import React, {useState} from 'react'
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
  CFormLabel,
  CFormTextarea,
    
  } from '@coreui/react';
  import axios from 'axios';

const AddCarsData = () => {

    const [formData, setFormData] = useState()
  const [errors, setErrors] = useState()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // console.log(e.target);
  }
  
  
  const [values, setValues] = useState({
    carname: '',
    cartype: '',
    description: ''
  });

  const navigate = useNavigate();
  //const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const hadleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name] : event.target.value}))
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      //const err = Validation(values);     
      //setErrors(err);
      
        axios.post('http://localhost:1234/api/module/addcars', values)
          .then(res => {
           console.log(res);
            if (res.data.errors) {
              setBackendError(res.data.errors);
            } else {
              setBackendError([]);
              if (res.data.status==true) {
                navigate('/manage-cars');
              } else {
                setErrors({...err,"addcars":res.data.message});
              }
            }
          })
          .catch(err => console.log("errors",err));            
   
  }

  return (
    <>
      <h1>Add Cars</h1>
      <CCard>
        <CCardBody>
        <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="carname">Car Name</CFormLabel>
          <CFormInput
            type="text"
            id="carname"
            name="carname"
            placeholder="Enter Car Name"
            value={formData?.name}
            onChange={hadleInput}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="cartype">Car Type</CFormLabel>
          <CFormInput
            type="text"
            id="cartype"
            name="cartype"
            placeholder="Enter Car Type"
            onChange={hadleInput}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="description">Description</CFormLabel>
          <CFormTextarea id="description" name="description" rows={3} onChange={hadleInput}>
            {formData?.description}
          </CFormTextarea>
        </div>
        <CCol xs="auto">
          <CButton color="primary" type="submit" className="mb-3">
            Submit
          </CButton>
        </CCol>
      </CForm>

        </CCardBody>
    </CCard>
    </>
  )
}

export default AddCarsData
