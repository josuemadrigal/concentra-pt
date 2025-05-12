import { create } from "apisauce";
import { Player, PlayersResponse } from "../types";

const API_URL = "https://dev-api.iqtekgolf.innovix.com.do:440/api";
const API_TOKEN = "F3J92ND9J5@493SBMDJW1344JEUDJ3TES3I/3";

export const apiClient = create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-token": API_TOKEN,
  },
});

const handleResponse = <T>(response: any): Promise<T> => {
  if (response.ok) {
    return Promise.resolve(response.data as T);
  }
  return Promise.reject(response.problem);
};

export const fetchPlayersApi = (): Promise<PlayersResponse> =>
  apiClient
    .get<PlayersResponse>("/player/list")
    .then((response) => handleResponse<PlayersResponse>(response));
