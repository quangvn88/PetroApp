export const functions = [
    {
        name: 'OrderApproval',
        title: 'Phê duyệt đơn hàng',
        imageUrl: require('../assets/OrderApproval.png'),
        keyAuth: 'PD_DONHANG'
    },
    {
        name: 'NegativeApproval',
        title: 'Cho phép xuất âm',
        imageUrl: require('../assets/NegativeApproval.png'),
        keyAuth: 'XUATAM'
    },
    {
        name: 'DeclareCycle',
        title: 'Khai báo PO CKG',
        imageUrl: require('../assets/DeclareCycle.png'),
        keyAuth: 'KB_POCKG'
    },
    {
        name: 'QuantityRevenue',
        title: 'Sản lượng, Doanh Thu',
        imageUrl: require('../assets/QuantityRevenue.png'),
        keyAuth: 'BC_SLDT'
    },
    {
        name: 'CreditApproval',
        title: 'Phê duyệt tín dụng',
        imageUrl: require('../assets/CreditApproval.png'),
        keyAuth: 'DUYET_TD'
    },
    {
        name: 'UnlockUser',
        title: 'Mở khóa tài khoản',
        imageUrl: require('../assets/UnlockUser.png'),
        keyAuth: 'MOKHOA'
    },
    {
        name: 'UnlockWarehouse',
        title: 'Mở kỳ kho',
        imageUrl: require('../assets/UnlockWarehouse.png'),
        keyAuth: 'MOKY_KHO'
    },
    {
        name: 'UnlockAccounting',
        title: 'Mở kỳ kế toán',
        imageUrl: require('../assets/UnlockAccounting.png'),
        keyAuth: 'MOKY_KT'
    }
];