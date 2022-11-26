import { MainLayout } from "../src/layouts";
import { withProtected } from "../src/utils/route";

function KnowledgeShots() {
  return (
    <MainLayout>
      <h1>KNOWLEDGE SHOTS</h1>
    </MainLayout>
  );
}

export default withProtected(KnowledgeShots);
