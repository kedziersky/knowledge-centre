import axios from "axios";

export const fetchApptensionFeed = async (
  page = 1,
  type: string,
  feedType: string
) => {
  try {
    const response = await axios.get(
      `/api/apptension-feed?page=${page}&type=${type}&feedType=${feedType}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
