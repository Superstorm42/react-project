// Sign related pages
export const signInPage = '/user/signin';
export const signUpPage = '/user/signup';
export const signOutPage = '/user/signout';
export const forgotPasswordPage = '/user/forgotPassword';
// Client View
export const homePage = '/'; // Home page to view all apartments. filtering and pagination available.
export const apartmentIndexMapPage = '/map'; //All apartment on map page. use all filter to get all available ones.
export const apartmentDetailsPage = '/apartment/details/'; // + apartment Id

// Dashboard Pages client,realtor,admin
export const userProfilePage = '/profile/'; //+userId take userid from param
export const passwordChangePage = '/settings/password/change'; // take userid from auth

// Dashboard Pages realtor, admin
export const apartmentIndexPage = '/apartment/all'; // bring all if admin, bring own's if realtor. take id from auth.
export const apartmentCreatePage = '/apartment/create'; // allow admin and realtor to create apartment
export const apartmentEditPage = '/apartment/edit/'; // allow admin to edit all and realtor to edit own's apartment.

// Dashboard Pages for admin.
export const userIndexPage = '/user/all'; // bring all users excluding admin. search by usertype available
export const userCreatePage = '/user/create'; // create user using same form as profile page.
export const userEditPage = '/profile/'; //+userId. take userid from param.
export const userDetailsPage = '/user/details/'; //+userId. take userid from param.

export const unAuthorisedPage = '/user/unauthorised';
export const getPasswordResetPage = (userId, resetTokenId) => {
	return `/user/${userId}/reset/${resetTokenId}`;
};
export const notFoundPage = '*';
