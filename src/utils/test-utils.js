/**
 * Takes an actionType stated as path (e.g. Reports/SubmitReportsState/VALIDATE_POSITION)
 * and returns the last path element (in case of the example VALIDATE_POSITION).
 * Used to keep the test runner console output short when types are passed to the test description statement
 * by reference (actions.someAction).
 * @param {String} pathedAction
 * @returns {String} {any}
 */
export const formatActionType = (pathedAction) => pathedAction.split('/').pop();

export default {
  formatActionType
};
