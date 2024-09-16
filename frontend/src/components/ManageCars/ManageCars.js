import {
  CButton,
  CRow,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCard
} from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const ManageCars = () => { 
  return (
    <>
      <div className="row">
        <div className="col-xxl-6 col-xl-4 col-sm-6">
          <h4>Cars Section</h4>
        </div>
        <div className="col-xxl-6 col-xl-4 col-sm-6">
          <p className="float-end">
            <CButton as="a" color="primary" role="button" size="sm">
              <Link to="/add-cars" style={{color: '#fff', textDecoration: 'none'} }>Add New Cars</Link>
            </CButton>
          </p>
        </div>

        <div>
        
          <CRow>
            <CCol sm={4}>
              <CCard>
                <CCardBody>
                  <CCardTitle>Special title treatment</CCardTitle>
                  <CCardText>
                    With supporting text below as a natural lead-in to additional content.
                  </CCardText>
                  <CButton color="warning" href="/add-cars" size="sm" className="ml-10">View</CButton>
                  <CButton color="primary" href="/add-cars" size="sm" className="ml-10">Update</CButton>
                  <CButton color="danger" href="/add-cars" size="sm" className="ml-10">Delete</CButton>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          
        </div>
      </div>
    </>
  )
}

export default ManageCars
