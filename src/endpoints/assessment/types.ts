import { getAuthDetails } from "../../utils/common.utils";
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

const assessmentTypesEndpoint = async () => {
  // ToDo: Here we can have a logic to prepare the params for individual APIs

  const { token, role } = await getAuthDetails();
  const searchParams = new URLSearchParams([
    ['schoolYearId', process.env.schoolYearId],
    ['curriculumId', process.env.curriculumId],
    ['districtId', process.env.districtId],
  ]);

  const apiUrl = `${process.env.url}/assessments/types?${searchParams.toString()}`;
  return {
    apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `user=${token};active_role=${role}`,
    },
  };
} 

export default assessmentTypesEndpoint;