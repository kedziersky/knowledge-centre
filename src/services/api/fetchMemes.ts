import axios from "axios";

export const fetchMemes = async (page = 1) => {
  try {
    const response = await axios.get(`/api/memes?page=${page}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
