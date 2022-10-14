import React, { Component } from 'react'
import { connect } from 'react-redux'


class FormDangKy extends Component {

    state = {
        value: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        },
        errors: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        },

    }
    inputChange = (event) => {

        let { value, name } = event.target;

        let newValues = { ...this.state.value, [name]: value }

        //! kiểm tra rỗng
        let newErrors = { ...this.state.errors }
        let errorMessage = ''
        if (value.trim() === '') {
            // lỗi
            errorMessage = name + ' không để trống!'
        }

        //! kiểm tra trùng mã SV   
        if (name === 'maSV') {
            let isExist = false;
            isExist = this.props.mangSV.some(sv => {
                return sv.maSV === value.replaceAll(' ', '')
            })
            if (isExist) {
                // lỗi
                errorMessage = 'Trùng mã sinh viên'
            }
        }

        //! kiểm tra tên
        if (name === 'hoTen') {
            let regex = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

            if (!regex.test(value)) {

                errorMessage = 'Họ tên chỉ được chứa ký tự chữ'
            }
        }

        //! kiểm tra số điện thoại
        if (name === 'sdt') {
            let regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

            if (!regex.test(value)) {

                errorMessage = 'Số điện thoại chưa hợp lệ'
            }
        }

        //! kiểm tra định dạng email
        let typeVal = event.target.getAttribute("typeinput");
        if (typeVal === "email") {
            // kiểm tra email
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            if (!regex.test(value)) {
 
                errorMessage = 'Email không đúng định dạng!'
            }
        }

        newErrors[name] = errorMessage; 

        this.setState({
            value: newValues,
            errors: newErrors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault() 

        //! kiểm tra các lỗi còn hay không
        let isValid = true;
        for (const key in this.state.errors) {
            if (this.state.errors[key] !== "") {
                // còn lỗi 
                isValid = false;
                break; 
            }
        }


        for (const key in this.state.value) {
            if (this.state.value[key] === "") {

                isValid = false;
                break;
            }
        }

        if (!isValid) {

            alert('Dữ liệu không hợp lệ')
            return
        }

        // dữ liệu hợp lệ
        //! đẩy dữ liệu người dùng lên redux

        let action = {
            type: 'THEM_SV',
            sinhVien: this.state.value
        }
        this.props.dispatch(action)

    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.sinhVienChiTiet
        })
    }

    render() {
        let { maSV, hoTen, sdt, email } = this.state.value
        return (
            <div className=''>
                <form onSubmit={(event) => {
                    this.handleSubmit(event);
                }}>
                    <div className="row">
                        <div className="col-6 mb-5">
                            <label>Mã SV</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={maSV} type="text" name="maSV" className="form-control" placeholder="Mã SV" />
                            <p className='text-danger'>{this.state.errors.maSV}</p>
                        </div>
                        <div className="col-6 mb-5">
                            <label>Họ tên</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={hoTen} type="text" name="hoTen" className="form-control" placeholder="Họ tên" />
                            <p className='text-danger'>{this.state.errors.hoTen}</p>
                        </div>
                        <div className="col-6 mb-5">
                            <label>Số điện thoại</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={sdt} type="text" name="sdt" className="form-control" placeholder="Số điện thoại" />
                            <p className='text-danger'>{this.state.errors.sdt}</p>
                        </div>
                        <div className="col-6 mb-5">
                            <label>Email</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={email} typeinput='email' type="text" name="email" className="form-control" placeholder="Email" />
                            <p className='text-danger'>{this.state.errors.email}</p>
                        </div>
                        <div className="col-12 text-center">
                            <button className='btn btn-success mx-1'>Thêm sinh viên</button>

                            <button type='button' onClick={() => {
                                let action = {
                                    type: "CAP_NHAT",
                                    svUpdate: this.state.value
                                }
                                this.props.dispatch(action)
                            }} className='btn btn-info mx-1'>Cập nhật</button>
                        </div>
                        <div className="row col-12 my-5">
                            <div className="col-9 form-group">
                                <input onChange={event => {
                                    this.state.maSV = event.target.value

                                    let action = {
                                        type: 'SEARCH',
                                        nameSVSearch: event.target.value
                                    }
                                    this.props.dispatch(action)
                                }} type="text" placeholder='Nhập tên sinh viên' className='form-control' />
                            </div>
                            <div className="col-3 form-group">
                                <button type='button' className='btn btn-primary'>Search</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sinhVienChiTiet: state.QLSVReducer.sinhVienChiTiet,
        mangSV: state.QLSVReducer.mangSV,
        mangSVTimKiem: state.QLSVReducer.mangSVTimKiem
    }
}

export default connect(mapStateToProps)(FormDangKy)