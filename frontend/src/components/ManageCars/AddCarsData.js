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
  CFormSelect,
  CFormCheck,
  CFormFeedback
    
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
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true);

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
      <h4>Add New Cars</h4>
      <CCard>
        <CCardBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue="Mark"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="First name"
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="text"
              defaultValue="Otto"
              feedbackValid="Looks good!"
              id="validationCustom02"
              label="First name"
              required
            />
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
            <CInputGroup className="has-validation">
              <CFormInput
                type="text"
                aria-describedby="inputGroupPrependFeedback"
                feedbackValid="Please choose a username."
                id="validationCustomUsername"
                required
              />
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom03Feedback"
              feedbackInvalid="Please provide a valid city."
              id="validationCustom03"
              label="City"
              required
            />
          </CCol>
          <CCol md={3}>
            <CFormSelect
              aria-describedby="validationCustom04Feedback"
              feedbackInvalid="Please select a valid state."
              id="validationCustom04"
              label="State"
              required
            >
              <option disabled>Choose...</option>
              <option>...</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              aria-describedby="validationCustom05Feedback"
              feedbackInvalid="Please provide a valid zip."
              id="validationCustom05"
              label="Zip"
              required
            />
          </CCol>
          <CCol xs={12}>
            <CFormCheck
              type="checkbox"
              id="invalidCheck"
              label="Agree to terms and conditions"
              required
            />
            <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Submit form
            </CButton>
          </CCol>
        </CForm>

        </CCardBody>
    </CCard>
    </>
  )
}

export default AddCarsData
