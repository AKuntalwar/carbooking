import React, {useState} from 'react'
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
    
  } from '@coreui/react'
  

const EditCars = () => {

    const [formData, setFormData] = useState()
  const [errors, setErrors] = useState()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // console.log(e.target);
  }

  const handleSubmit = (event) => {
    // event.preventDefault();
    // //const err = Validation(values);     
    // //setErrors(err);
    
    //   axios.post('http://localhost:1234/api/module/addcars', values)
    //     .then(res => {
    //      console.log(res);
    //       if (res.data.errors) {
    //         setBackendError(res.data.errors);
    //       } else {
    //         setBackendError([]);
    //         if (res.data.status==true) {
    //           navigate('/manage-cars');
    //         } else {
    //           setErrors({...err,"login":res.data.message});
    //         }
    //       }
    //     })
    //     .catch(err => console.log("errors",err));            
 
}
  




  return (
    <>
      <h1>Edit Cars</h1>
      <CCard>
        <CCardBody>
        <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData?.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="description">Description</CFormLabel>
          <CFormTextarea id="description" name="description" rows={3} onChange={handleChange}>
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

export default EditCars
