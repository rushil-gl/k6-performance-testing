import { getAuthDetails } from "../../../utils/common.utils";
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

import http from "k6/http";
import { check, sleep } from "k6";

export { options } from "../../../config/stress.config";

export default async function () {

  const { token, role } = await getAuthDetails();
  const searchParams = new URLSearchParams([
    ['schoolYearId', process.env.schoolYearId],
    ['curriculumId', process.env.curriculumId],
    ['districtId', process.env.districtId],
    ['page', 1],
    ['limit', 10]
  ]);

  const apiUrl = `${process.env.url}/assessments/list?${searchParams.toString()}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `user=${token};active_role=${role}`,
    },
    tags: {
      tag: 'assessments/list',
    },
  };

  // Start bombarding
  const response = http.get(apiUrl, params);

  // Check the response
  check(response, {
    "status was 200": (r) => r.status == 200,
  });
  sleep(1);
}
