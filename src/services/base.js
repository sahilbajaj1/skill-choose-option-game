import axios from "axios";
import { endPoints } from "../constants/EndPoints";

export const getScoreFromBackend = async () => {
  return await axios.get(endPoints.getScore);
};

export const postScoreToBackend = async (body) => {
  await axios.post(endPoints.postScore, { data: body });
};
