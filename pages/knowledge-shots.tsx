import { Layout } from "../src/components/layout";
import { withProtected } from "../src/utils/route";

function KnowledgeShots() {
  return (
    <MainLayout>
      <h1>KNOWLEDGE SHOTS</h1>
    </Layout>
  );
}

export default withProtected(KnowledgeShots);
