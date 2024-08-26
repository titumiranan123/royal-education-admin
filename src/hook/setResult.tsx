import { pushResultAction } from "../redux/result";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pushResult = (result:any) => async (dispatch:any) => {
  try {
    await dispatch(pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};
