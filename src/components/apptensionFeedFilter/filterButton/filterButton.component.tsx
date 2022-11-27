import { Button } from "@chakra-ui/react";

import { useRouter } from "next/router";

export const FilterButton = ({ name, filterName, setType }: any) => {
  const router = useRouter();

  const { filter } = router.query;

  const isActive = filter === filterName;
  const handleButtonClick = () => {
    setType(filterName);
    router.push(
      {
        pathname: "/apptension-feed",
        query: { filter: filterName },
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
