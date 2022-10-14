
const initialState = {

    mangSV: [
        { maSV: 'user1', hoTen: 'Nguyễn Thị A', sdt: '012312443', email: 'asdasd@gmail.com' },
        { maSV: 'user2', hoTen: 'Trần Văn B', sdt: '345622344', email: 'thib@gmail.com' },
    ],

    sinhVienChiTiet: {},

    mangSVTimKiem: []
}


export const QLSVReducer = (state = initialState, action) => {
    switch (action.type) {

        case "THEM_SV":
            state.mangSV = [...state.mangSV, action.sinhVien]

            return { ...state }

        case "XOA_SV":
            state.mangSV = state.mangSV.filter(sv => {
                return sv.maSV !== action.maXoa
            })
            return { ...state }

        case "XEM_CHI_TIET":
            state.sinhVienChiTiet = action.svChiTiet
            return { ...state }

        case "CAP_NHAT":

            let num = state.mangSV.findIndex(sv => {
                return sv.maSV === action.svUpdate.maSV
            })

            state.mangSV[num] = action.svUpdate;

            state.mangSV = [...state.mangSV]

            return { ...state }

        case "SEARCH":

            let mangSVTK = [];
            let tuKhoaThuong = action.nameSVSearch.toLowerCase()
            state.mangSV.map(sv => {
                let tenSVThuong = sv.hoTen.toLowerCase()
                let viTriTK = tenSVThuong.indexOf(tuKhoaThuong);
                if (viTriTK !== -1) {
                    mangSVTK.push(sv);
                }
            })
            state.mangSVTimKiem = mangSVTK
      
            return {...state}

        default:
            return state
    }
}



