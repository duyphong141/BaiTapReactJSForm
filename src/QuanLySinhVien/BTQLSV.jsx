import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableNguoiDung from './TableNguoiDung'

export default class BTQLSV extends Component {
  render() {
    return (
        <div className='container py-5'>
        <h1 className='text-center bg-dark text-white'>Thông tin sinh viên</h1>
        <FormDangKy/>
        <TableNguoiDung/>
    </div>
    )
  }
}
