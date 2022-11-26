import { Layout } from "../src/components/layout";
import { withProtected } from "../src/utils/route";

function DevTalks() {
  return (
    <Layout>
      <h1>DEV TALKS</h1>
    </Layout>
  );
}

export default withProtected(DevTalks);
