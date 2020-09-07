export const checkPermission = (userCompanyCode) => {
    if (userCompanyCode === "*" || userCompanyCode === "8810")
        return true;
    return false;
}