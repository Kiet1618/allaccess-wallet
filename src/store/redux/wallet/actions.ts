import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateFlowAccountRequest, createFlowAccount } from "@app/blockchain/flow/apis";

export const createAccount = createAsyncThunk<any, CreateFlowAccountRequest>("set/createAccount", async (payload, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data, error } = await createFlowAccount(payload);
    if (error) throw new Error(error);
    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
