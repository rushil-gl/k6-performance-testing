export const getAuthDetails = async () => {
  // ToDo: Decide dynamically which token do you want. May be call API dynamically based on role.
  return {
    token: process.env.token,
    role: 'teacher',
  };
}