import axios from "axios";

export const fetchFeed = async (page = 1, type: string, feedType: string) => {
  try {
    const response = await axios.get(
      `/api/feed?page=${page}&type=${type}&feedType=${feedType}`
    );
    console.log({ response });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
