import { Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

export const FilterButton = ({
  name,
  filterName,
  setFeedType,
  setSecondHalf,
  setFirstHalf,
}: any) => {
  const router = useRouter();

  const { filter, feedType } = router.query;

  const isActive = feedType === filterName;
  const handleButtonClick = () => {
    setSecondHalf([]);
    setFirstHalf([]);
    setFeedType(filterName);
    router.push(
      {
        pathname: "/news-feed",
        query: { feedType: filterName, filter },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Button
      onClick={handleButtonClick}
      colorScheme="cyan"
      variant={isActive ? "solid" : "outline"}
      mr={3}
      pointerEvents={isActive ? "none" : "auto"}>
      {name}
    </Button>
  );
};
