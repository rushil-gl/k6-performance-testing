import assessmentListEndpoint from "./assessment/list";
import assessmentTypesEndpoint from "./assessment/types";

export const getApiDetails = async () => {
  return {
    'assessments/list': await assessmentListEndpoint(),
    'assessments/types': await assessmentTypesEndpoint(),
  }
};