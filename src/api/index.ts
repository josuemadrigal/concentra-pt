import axios from "axios";
import { Player, PlayersResponse } from "../types";

const API_URL = "https://dev-api.iqtekgolf.innovix.com.do:440/api";
const API_TOKEN = "F3J92ND9J5@493SBMDJW1344JEUDJ3TES3I/3";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-token": API_TOKEN,
  },
});
