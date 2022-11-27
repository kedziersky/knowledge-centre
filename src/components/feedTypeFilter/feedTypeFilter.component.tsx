import { Flex } from "@chakra-ui/react";
import { FILTER_OPTIONS } from "./feedTypeFilter.constants";
import { FilterButton } from "./filterButton";

export const FeedTypeFilter = ({
  setFeedType,
  setSecondHalf,
  setFirstHalf,
}: any) => {
  return (
    <Flex mb="8">
      {FILTER_OPTIONS.map(({ name, filterName }) => (
        <FilterButton
          name={name}
          filterName={filterName}
          setFeedType={setFeedType}
          setSecondHalf={setSecondHalf}
          setFirstHalf={setFirstHalf}
        />
      ))}
    </Flex>
  );
};
