export default () => {
  return localStorage.getItem('loginUserId') || '';
};
