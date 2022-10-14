import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableNguoiDung extends Component {

    renderMangSV = () => {

        let mangRender;

        if (this.props.mangSVTimKiem.length === 0 ) {
            mangRender = this.props.mangSV
        } else {
            mangRender = this.props.mangSVTimKiem
        }


        return mangRender.map((sv, index) => {

            return <tr key={index}>
                <td>{sv.maSV}</td> 
                <td>{sv.hoTen}</td>
                <td>{sv.sdt}</td>
                <td>{sv.email}</td>
                <td>
                    <button onClick={() => {
                        let action = {
                            type: "XOA_SV",
                            maXoa: sv.maSV
                        }
                        this.props.dispatch(action)
                    }} className='btn btn-danger mx-1'>Xóa</button>
                    
                    <button onClick={() => {
                        let action = {
                            type: "XEM_CHI_TIET",
                            svChiTiet: sv
                        }
                        this.props.dispatch(action);
                    }} className='btn btn-info mx-1'>Xem</button>
                </td>
            </tr>
        })
    }

    render() {
        return (
            <div className=''>
                <table className="table text-center">
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMangSV()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mangSV: state.QLSVReducer.mangSV,
        mangSVTimKiem: state.QLSVReducer.mangSVTimKiem
    }
}

export default connect(mapStateToProps)(TableNguoiDung)