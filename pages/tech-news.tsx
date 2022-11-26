import { useQuery } from "react-query";
import { Layout } from "../src/components/layout";
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
      <h1>TECH NEWS</h1>
    </MainLayout>
  );
}

export default withProtected(TechNews);
