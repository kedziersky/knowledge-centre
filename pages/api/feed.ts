// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import RSSParser from "rss-parser";

const ITEMS_PER_PAGE = 10;
const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
const blogFeed = [
  {
    url: "https://vived.io/feed",
    type: "blog",
    lang: "eng",
    nickname: "Kent C. Dodds",
  },
];
const parser = new RSSParser({
  customFields: {
    item: [
      ["content:encoded", "content"],
      ["author", "creator"],
      ["media:group", "group"],
    ],
  },
});
export default async function handler(req: any, res: any) {
  //const blogFeed = await axios.get(`${process.env.CMS_DOMAIN}/feeds`);

  try {
    const data: any = [];
    const page = req.query.page;
    const lang = req.query.lang;
    const type = req.query.type;
    for (const item of blogFeed) {
      const feed = await parser.parseURL(item.url);

      feed.items.forEach((el) => {
        const newObj = {
          ...el,
          type: item.type,
          lang: item.lang,
          nickname: item.nickname,
        };
        data.push(newObj);
      });
    }

    data.sort((a: any, b: any) => {
      //@ts-ignore
      return new Date(b.isoDate) - new Date(a.isoDate);
    });

    const sortByCategory =
      type === "all" ? data : data.filter((a: any) => a.type === type);

    res.status(200).json({
      data: paginate(sortByCategory, ITEMS_PER_PAGE, page),
      pageCount: Math.ceil(sortByCategory.length / ITEMS_PER_PAGE),
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
