/* eslint-disable import/prefer-default-export */
/**
 * Re-usable thunk for async data loading.
 * Source: https://engineering.blogfoster.com/managing-complexity-in-redux-higher-order-reducers-and-async-state/
 *
 * Sample call:
 * <code>

  const fetchFoodItems = createActionCreator(
    {
      pending: FOOD_ITEMS_FETCH_PENDING,
      complete: FOOD_ITEMS_FETCH_COMPLETE,
      error: FOOD_ITEMS_FETCH_ERROR,
    },
    () => () => foodService.fetchFoodItems(),
  );

 * </code>
 *
 */


export const asyncActionCreator = (asyncTypes, createThunk) => (...args) => {
  const thunk = createThunk(...args);
  return (dispatch) => {
    console.log('dispatch', dispatch);
    dispatch({ type: asyncTypes.pending });
    console.log('thunk', thunk);
    return dispatch(thunk)
      .then(payload => ({
        type: asyncTypes.complete,
        payload
      }))
      .catch(err => ({
        type: asyncTypes.error,
        error: true,
        payload: err
      }));
  };
};
