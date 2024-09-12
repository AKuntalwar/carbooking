import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CCard,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const ManageCars = () => {
  

  return (
    <>
      <div className="row">
        <div className="col-xxl-6 col-xl-4 col-sm-6">
          <h4>Manage Cars Data</h4>
        </div>
        <div className="col-xxl-6 col-xl-4 col-sm-6">
          <p className="float-end">
            <CButton as="a" color="primary" role="button">
              <Link to="/add-cars" style={{color: '#fff', textDecoration: 'none'} }>Add Cars</Link>
            </CButton>
          </p>
        </div>

        <div>
          <CCard>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell><CButton color="info" shape="rounded-pill"><Link to="/edit-cars" style={{color: '#fff', textDecoration: 'none'} }>Edit</Link></CButton><CButton color="danger" shape="rounded-pill">Delete</CButton></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCard>
        </div>
      </div>
    </>
  )
}

export default ManageCars
