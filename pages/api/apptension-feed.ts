// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../src/utils/firebaseConfig";
import openGraph from "fetch-opengraph";

const ITEMS_PER_PAGE = 10;
const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export default async function handler(req: any, res: any) {
  try {
    const type = req.query.type;
    const newsCollection = collection(firestore, "apptensionFeed");
    const queryCollection = query(
      newsCollection,
      where("category", "==", type)
    );
    const snapshot = await getDocs(queryCollection);
    const data: any = [];
    for (let i = 0; i < snapshot.docs.length; i++) {
      // doc.data() is never undefined for query doc snapshots

      const da = await snapshot.docs[i].data();
      const url = da.url;
      const dataOpenGraph = await openGraph.fetch(url);

      const newObj = {
        ...da,
        title: dataOpenGraph["og:title"],
        imageOg: dataOpenGraph["og:image"],
        image: dataOpenGraph["image"],
        desc: dataOpenGraph["og:description"],
        video: dataOpenGraph["video"],
      };

      data.push(newObj);
    }

    const page = req.query.page;
    const feedType = req.query.feedType;

    /*  data.sort((a: any, b: any) => {
      //@ts-ignore
      return new Date(b.isoDate) - new Date(a.isoDate);
    }); */

    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
}
