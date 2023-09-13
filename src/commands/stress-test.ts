import http, { BatchRequest } from "k6/http";
import { check, sleep } from "k6";
import apiList from "../api-list.test.json";
import { getApiDetails } from "../endpoints/index";

export { options } from "../config/stress.config";

export default async function () {
  const apiDetails: {[key: string]: any} = await getApiDetails();

  if (apiList.length > 1) { // If we want to test endpoints in batch
    const batch: BatchRequest[] = [];

    // Prepare the data
    apiList.forEach((api) => {
      const { apiUrl, headers } = apiDetails[api];
      batch.push(['GET', apiUrl, null, { headers }]);
    });

    // Start bombarding
    const responses = http.batch(batch);
      
    // Check the response
    responses.forEach((response) => {
      check(response, {
        'Status is 200': (r) => r.status === 200,
      });
    });
  } else if (apiList.length === 1) { // If we want to test single endpoint
    const [endpoint] = apiList;

    // Prepare the data
    const { apiUrl, headers } = apiDetails[endpoint];

    // Start bombarding
    const response = http.get(apiUrl, { headers });

    // Check the response
    check(response, {
      "status was 200": (r) => r.status == 200,
    });
  }
  sleep(1);
}
