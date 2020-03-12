export const types = {
  GET_TOTAL_CALORIES: "GET_TOTAL_CALORIES",
  GET_USED_CALORIES: "GET_USED_CALORIES",
  GET_DANGER_PRODUCTS: "GET_DANGER_PRODUCTS",
  GET_INFO_FOR_INPUTS: "GET_INFO_FOR_INPUTS",
  GET_DATE: "GET_DATE"
};

export const getTotalCalories = calories => ({
  type: types.GET_TOTAL_CALORIES,
  payload: { calories }
});

export const getTotalUsedCalories = usedCalories => ({
  type: types.GET_USED_CALORIES,
  payload: { usedCalories }
});

export const getInfoForInputs = info => ({
  type: types.GET_INFO_FOR_INPUTS,
  payload: { info }
});

export const getDangerProducts = products => ({
  type: types.GET_DANGER_PRODUCTS,
  payload: products
});

export const getDate = date => ({
  type: types.GET_DATE,
  payload: { date }
});
