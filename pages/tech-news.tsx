import { Layout } from "../src/components/layout";
import { withProtected } from "../src/utils/route";

function TechNews() {
  return (
    <Layout>
      <h1>TECH NEWS</h1>
    </Layout>
  );
}

export default withProtected(TechNews);
