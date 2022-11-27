import { Flex } from "@chakra-ui/react";
import { FILTER_OPTIONS } from "./feedFilter.constants";
import { FilterButton } from "./filterButton";

export const FeedFilter = () => {
  return (
    <Flex mb="5">
      {FILTER_OPTIONS.map(({ name, filterName }) => (
        <FilterButton name={name} filterName={filterName} />
      ))}
    </Flex>
  );
};
