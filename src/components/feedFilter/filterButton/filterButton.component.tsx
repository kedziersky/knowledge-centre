import { Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

export const FilterButton = ({ name, filterName }: any) => {
  const router = useRouter();

  const { filter, feedType } = router.query;

  const isActive = filter === filterName;
  const handleButtonClick = () => {
    router.push(
      {
        pathname: "/news-feed",
        query: { filter: filterName, feedType },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Button
      onClick={handleButtonClick}
      variant={isActive ? "solid" : "outline"}
      mr={3}
      pointerEvents={isActive ? "none" : "auto"}>
      {name}
    </Button>
  );
};
