/**
 * Re-usable thunk for async data loading.
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
 * Source: https://engineering.blogfoster.com/managing-complexity-in-redux-higher-order-reducers-and-async-state/
 * 
 */
export const asyncActionCreator = (asyncTypes, createThunk) => (...args) => {
  const thunk = createThunk(...args);

  return dispatch => {
    dispatch({ type: asyncTypes.pending });

    // We assume here that the wrapped thunk produces a Promise
    // We call dispatch on the thunk (it's just a normal thunk, after all)
    // and since dispatch yields its result, we can utilize the returned
    // Promise
    return dispatch(thunk)
      .then(payload => ({
        type: asyncTypes.complete,
        payload,
      }))
      .catch(err => ({
        type: asyncTypes.error,
        error: true,
        payload: error,
      }));
  };
};