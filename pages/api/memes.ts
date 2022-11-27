// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import RSSParser from "rss-parser";

const ITEMS_PER_PAGE = 10;
const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
const blogFeed = [
  {
    url: "https://www.reddit.com/r/iiiiiiitttttttttttt.rss",
    type: "hr",
    feedType: "article",
  },
  {
    url: "https://www.reddit.com/r/ProgrammerHumor.rss",
    type: "hr",
    feedType: "article",
  },
];

const parser = new RSSParser({
  customFields: {
    item: [
      ["content:encoded", "article"],
      ["author", "creator"],
      ["media:group", "group"],
      ["media:thumbnail", "thumbnail"],
    ],
  },
});
export default async function handler(req: any, res: any) {
  //const blogFeed = await axios.get(`${process.env.CMS_DOMAIN}/feeds`);

  try {
    const data: any = [];
    const page = req.query.page;

    for (const item of blogFeed) {
      const feed = await parser.parseURL(item.url);

      feed.items.forEach((el) => {
        const newObj = {
          ...el,
          source: feed.title,
          sourceUrl: feed.link,
          thumbnail: el.thumbnail?.$,
        };
        el.thumbnail?.$ && data.push(newObj);
      });
    }
    data.sort((a: any, b: any) => {
      //@ts-ignore
      return new Date(b.isoDate) - new Date(a.isoDate);
    });

    res.status(200).json({
      data: paginate(data, ITEMS_PER_PAGE, page),
      pageCount: Math.ceil(data.length / ITEMS_PER_PAGE),
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json(err);
  }
}
