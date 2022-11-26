import { useQuery } from "react-query";
import { NewsBox } from "../src/components/news";

import { MainLayout } from "../src/layouts";
import { fetchFeed } from "../src/services/api/fetchFeed";
import { withProtected } from "../src/utils/route";

function TechNews() {
  const { data, status } = useQuery(["feed", [1, "blog", "eng"]], () =>
    fetchFeed(1, "blog", "eng")
  );
  console.log({ data });
  return (
    <MainLayout>
      <NewsBox />
    </MainLayout>
  );
}

export default withProtected(TechNews);
