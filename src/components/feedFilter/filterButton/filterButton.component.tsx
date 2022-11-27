import { Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

export const FilterButton = ({
  name,
  filterName,
  setType,
  setFirstHalf,
  setSecondHalf,
}: any) => {
  const router = useRouter();

  const { filter, feedType } = router.query;

  const isActive = filter === filterName;
  const handleButtonClick = () => {
    setFirstHalf([]);
    setSecondHalf([]);
    setType(filterName);
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
      colorScheme="blue"
      pointerEvents={isActive ? "none" : "auto"}>
      {name}
    </Button>
  );
};
