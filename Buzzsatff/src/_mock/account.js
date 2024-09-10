// ----------------------------------------------------------------------
let userDetails = sessionStorage?.getItem('userDetails')
userDetails = JSON.parse(userDetails)
const account = {
  displayName: `${userDetails?.first_name} ${userDetails?.last_name}`,
  email: 'demo@minimals.cc',
  photoURL: userDetails?.profile_pic,
};
export default account;
