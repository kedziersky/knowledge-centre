import axios from "axios";

export const fetchFeed = async (page = 0, type: string, lang: string) => {
  try {
    const response = await axios.get(`/api/feed?page=1&type=blog&lang=eng}`);
    console.log({ response });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
