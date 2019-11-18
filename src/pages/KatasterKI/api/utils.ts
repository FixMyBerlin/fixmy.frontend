import { MultiChoice } from '../state';

/**
 * Marshall state of a multi_choice component for sending in a request
 *
 * @param values state of multi_choice input component
 */
export const marshallMultiChoice = (
  values: MultiChoice
): {
  choices: Array<string>;
  other: string;
} => {
  let other = '';
  const choices = Object.keys(values)
    .map((field) => {
      // Optional freeform input fields are stored in fieldnames ending in
      // "-input". These are returned separately.
      // Checkbox inputs in the multi_choice component are returned as a list
      // of all "checked" fieldnames
      if (field.endsWith('-input')) {
        other = values[field].toString();
      } else {
        return values[field] ? field : null;
      }
    })
    .filter((val) => val != null);
  return {
    choices,
    other
  };
};

interface getEndpointURL {
  (
    endpoint: 'profile' | 'perspective',
    sessionId: string,
    sceneID: null
  ): string;

  (endpoint: 'answer', sessionId: string, sceneID: string): string;
}

/** Build an endpoint URL given an endpoint configured in the global config
 *
 * @param endpoint name of the endpoint from config.katasterKI.api
 */
export const getEndpointURL: getEndpointURL = (
  endpoint,
  sessionId,
  sceneID
) => {
  const projectId = config.katasterKI.projectId;
  if (endpoint === 'profile' || endpoint === 'perspective')
    return `${config.apiUrl}/survey/${projectId}/${sessionId}`;
  if (endpoint === 'answer')
    return `${config.apiUrl}/survey/${projectId}/${sessionId}/${sceneID}`;

  throw Error(`Endpoint ${endpoint} has no configured backend route`);
};
