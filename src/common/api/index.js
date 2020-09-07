// URL server API PRD
// export const API = 'http://erp.petrolimex.com.vn:8001/prd';
// URL server API QAS
export const API = 'https://erp.petrolimex.com.vn/qas';
// URL server API DEV
// const API = 'http://192.168.30.6:4000';// URL server DEV



// Get mã công ty
export const API_COMPANYCODE = API + '/api/getCompanycode';
// Get mã hàng
export const API_PRODUCTCODE = API + '/api/getProductCode';
// Get mã kho
export const API_PLANTCODE = API + '/api/getPlantCode';
// Get tên tài khoản SAP
export const API_USERNAME = API + '/api/getUser';



/*----------------------Kiểm tra đăng nhập--------------------------*/
export const API_LOGIN = API + '/api/checkLogin';



/*---------------------1. PO KCG---------------------------------*/
// Get danh sách PO CKG
export const API_PO = API + '/api/getPo';
// Tạo mới PO CKG
export const API_CREATE_PO = API + '/api/createPo';
// Xóa PO CKG
export const API_DELETE_PO = API + '/api/deletePo';



/*---------------------2. Phê duyệt đơn hàng--------------------------*/
// Get danh sách đơn hàng
export const API_EBELNS = API + '/api/getListOrderApproval';
// Release đơn hàng
export const API_RELEASE_EBELN = API + '/api/releaseEbeln';



/*---------------------3. Cho phép xuất âm----------------------------*/
// Get mặt hàng, kho xuất âm
export const API_NEGATIVE = API + '/api/getNegativeApproval';
// Phê duyệt/Không phê duyệt
export const API_CHECK_NEGATIVE = API + '/api/checkNegativeApproval';



/*---------------------4. Sản lượng doanh thu-------------------------*/
/*Get thông tin sản lượng, doanh thu*/
export const API_GET_QUANTITY_REVENUE = API + '/api/getQuantityRevenue';



/*---------------------5. Phê duyệt tín dụng--------------------------*/
// Get danh sách lệnh xuất
export const API_VBELNS = API + '/api/getListCreditApproval';
// Release lệnh xuất
export const API_RELEASE_VBELN = API + '/api/releaseVbeln';



/*---------------------6. Mở khóa tài khoản---------------------------*/
// Get thông tin tài khoản
export const API_USERDETAIL = API + '/api/getUserDetail';
// Mở khóa tài khoản
export const API_UNLOCKUSER = API + '/api/unlockUser';



/*---------------------7. Mở kỳ kho-----------------------------------*/
// Mở khóa kỳ kho
export const API_UNLOCK_WAREHOUSE = API + '/api/unlockWarehouse';
// Get thông tin kỳ kho của công ty
export const API_WAREHOUSE = API + '/api/getWarehouse';



/*---------------------8. Mở kỳ kế toán-------------------------------*/
// Mở khóa kỳ kế toán
export const API_UNLOCK_ACOUNTING = API + '/api/unlockAcounting';
// Get thông tin kỳ kế toán của công ty
export const API_ACOUNTING = API + '/api/getAcounting';


