import { MainLayout } from "../src/layouts";
import { withProtected } from "../src/utils/route";

function DevTalks() {
  return (
    <MainLayout>
      <h1>DEV TALKS</h1>
    </MainLayout>
  );
}

export default withProtected(DevTalks);
