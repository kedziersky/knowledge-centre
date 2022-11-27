import { Flex } from "@chakra-ui/react";
import { FILTER_OPTIONS } from "./feedTypeFilter.constants";
import { FilterButton } from "./filterButton";

export const FeedTypeFilter = () => {
  return (
    <Flex mb="8">
      {FILTER_OPTIONS.map(({ name, filterName }) => (
        <FilterButton name={name} filterName={filterName} />
      ))}
    </Flex>
  );
};
