// src/services/config.js

export const Base_URI = "http://localhost:3006";
// export const Base_URI = "https://backend.thetrippingtales.com";

export const config = {
    imageurl:'http://localhost:3006',
    // imageurl:'https://backend.thetrippingtales.com',
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
    GetAllPageContents: `${Base_URI}/admin/getAllPageContents`,
    GetPageContentById: `${Base_URI}/admin/getPageContentById`,
    GetPageContentByCategory: `${Base_URI}/admin/getPageContentByCategory`,
    
};
