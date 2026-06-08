import axios from "axios";

export const MOCK_API = "https://6a0519bdaa826ca75c097812.mockapi.io";
export const FAKE_STORE_API = "https://fakestoreapi.com";

export const mockApiClient = axios.create({
  baseURL: MOCK_API,
});

export const fakeStoreClient = axios.create({
  baseURL: FAKE_STORE_API,
});
