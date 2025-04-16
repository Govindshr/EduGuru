import EditService from "../pages/EditService";

export const Base_URI = "http://localhost:3006";
// export const Base_URI = "http://eduguru.biz:3006";

export const config = {
    imageurl:'http://localhost:3006/file',
    // imageurl:'http://eduguru.biz:3006/file',
    Login: `${Base_URI}/admin/login`,
    GetSections: `${Base_URI}/admin/getSection`,
    GetBanner: `${Base_URI}/admin/getBanner`,
    UpdateWhatWeAre: `${Base_URI}/admin/saveSection`,
    SaveCategory: `${Base_URI}/admin/createCategory`,
    SaveOrUpdateWhoWeAre: `${Base_URI}/admin/saveOrUpdateWhoWeAre`,
    GetWhoWeAre: `${Base_URI}/admin/getWhoWeAreSection`,
    GetAllPartners: `${Base_URI}/admin/getAllPartner`,
    SavePartner: `${Base_URI}/admin/savePartner`,
    DeletePartner: `${Base_URI}/admin/deletePartner`,
    DeletePageContent: `${Base_URI}/admin/deletePageContent`,
    DeleteCategory: `${Base_URI}/admin/deleteCategory`,
    GetAllQueries: `${Base_URI}/admin/getAllQueries`,
    SaveQuery: `${Base_URI}/admin/saveQuery`,
    SaveOrUpdateBanner: `${Base_URI}/admin/saveOrUpdateBanner`,
    GetAllCategories: `${Base_URI}/admin/getAllCategories`,
    SavePageContent: `${Base_URI}/admin/savePageContent`,
    EditPageContent: `${Base_URI}/admin/updatePageContent`,
    GetAllPageContents: `${Base_URI}/admin/getAllPageContents`,
    GetPageContentById: `${Base_URI}/admin/getPageContentById`,
    GetPageContentByCategory: `${Base_URI}/admin/getPageContentByCategory`,
    AddServices: `${Base_URI}/admin/createService`,
    GetAllServices: `${Base_URI}/admin/getAllServices`,
    GetServicesById: `${Base_URI}/admin/getServiceById`,
    DeleteService: `${Base_URI}/admin/deleteService`,
    EditService: `${Base_URI}/admin/updateService`,

    
};
