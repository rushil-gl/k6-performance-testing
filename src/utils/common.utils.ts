import http from "k6/http";
import { ROLES } from "../enums/role.enum";

export const getAuthDetails = async (role: ROLES) => {
  // ToDo: Decide dynamically which token do you want. May be call API dynamically based on role.

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.AUTH_API_KEY!,
    },
  };

  const username = (
    role === ROLES.TEACHER ? process.env.AUTH_TEACHER :
    role === ROLES.SCHOOL_ADMIN ? process.env.AUTH_SCHOOL_ADMIN_USER :
    process.env.AUTH_ADMIN_USER
  );

  const body = {
    secret: process.env.AUTH_SECRET,
    username,
  };

  const response = http.post(process.env.AUTH_URL!, JSON.stringify(body), params);
  const data: any = response.json();
  return {
    token: data.AccessToken,
  };
}