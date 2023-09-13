import { getAuthDetails } from "../../utils/common.utils";
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

const assessmentListEndpoint = async () => {
  // ToDo: Here we can have a logic to prepare the params for individual APIs

  const { token, role } = await getAuthDetails();
  const searchParams = new URLSearchParams([
    ['schoolYearId', process.env.schoolYearId],
    ['curriculumId', process.env.curriculumId],
    ['districtId', process.env.districtId],
    ['page', 1],
    ['limit', 10]
  ]);

  const apiUrl = `${process.env.url}/assessments/list?${searchParams.toString()}`;
  return {
    apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `user=${token};active_role=${role}`,
    },
  };
} 

export default assessmentListEndpoint;