import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateFlowAccountRequest, createFlowAccount } from "@app/blockchain/flow/apis";
import { sendMailPhrase } from "@app/wallet/metadata";

export const createAccount = createAsyncThunk<any, CreateFlowAccountRequest>("set/createAccount", async (payload, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data, error } = await createFlowAccount(payload);
    if (error) throw new Error(error);
    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const sendPhraseToEmail = createAsyncThunk<any, { email: string; phrase: string }>("send/send_phrase_to_email", async (payload, { fulfillWithValue, rejectWithValue }) => {
  try {
    const { data, error } = await sendMailPhrase(payload);
    if (error) throw new Error(error);
    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
