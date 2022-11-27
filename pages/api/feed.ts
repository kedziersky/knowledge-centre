// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import RSSParser from "rss-parser";

const ITEMS_PER_PAGE = 10;
const paginate = (array: any[], page_size: number, page_number: number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
const blogFeed = [
  {
    url: "https://www.hrbartender.com/feed/",
    type: "hr",
    feedType: "article",
  },
  {
    url: "https://www.evilhrlady.org/feed",
    type: "hr",
    feedType: "article",
  },
  {
    url: "https://www.tinypulse.com/blog/rss.xml",
    type: "hr",
    feedType: "article",
  },
  {
    url: "https://www.smashingmagazine.com/feed",
    type: "frontend",
    feedType: "article",
  },
  {
    url: "https://www.sitepoint.com/sitepoint.rss",
    type: "frontend",
    feedType: "article",
  },
  {
    url: "https://tympanus.net/codrops/feed/",
    type: "frontend",
    feedType: "article",
  },
  {
    url: "https://austingil.com/category/development/back-end/feed/",
    type: "backend",
    feedType: "article",
  },
  {
    url: "https://testguild.com/feed/",
    type: "qa",
    feedType: "article",
  },
  {
    url: "https://www.softwaretestingmagazine.com/wp-content/cache/page_enhanced/www.softwaretestingmagazine.com/feed/_index_slash.xml",
    type: "qa",
    feedType: "article",
  },
  {
    url: "https://vived.io/feed",
    type: "dev-mix",
    feedType: "article",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCbRP3c757lWg9M-U7TyEkXA",
    type: "frontend",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC6vRUjYqDuoUsYsku86Lrsw",
    type: "frontend",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCFbNIlppjAuEX4znoulh0Cw",
    type: "frontend",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC_ML5xP23TOWKUcc-oAE_Eg",
    type: "backend",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCd6MoB9NC6uYN2grvUNT-Zg",
    type: "backend",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCXB6zy4Pu9bPVQHvS8XKLUw",
    type: "qa",
    feedType: "video",
  },
  {
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCCAwIFH3FRVD9GBuVRW_mUw",
    type: "qa",
    feedType: "video",
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
    const type = req.query.type;
    const feedType = req.query.feedType;
    const feedData = blogFeed.filter((a: any) => {
      return a.type === type && a.feedType === feedType;
    });

    for (const item of feedData) {
      const feed = await parser.parseURL(item.url);

      feed.items.forEach((el) => {
        const newObj = {
          ...el,
          type: item.type,
          feedType: item.feedType,
          source: feed.title,
          sourceUrl: feed.link,
          sourceAvatar: feed.image?.url,
          thumbnail:
            item.feedType === "video" ? el.group["media:thumbnail"] : null,
        };
        data.push(newObj);
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
