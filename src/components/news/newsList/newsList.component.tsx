import { Grid } from "@chakra-ui/react";
import { NewsBox } from "../newsBox";

export const NewsList = ({ items }: any) => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={"45px"}
      alignItems="start"
      gridAutoRows="minmax(min-content,max-content)">
      {items.data && items.data.map((item: any) => <NewsBox item={item} />)}
    </Grid>
  );
};
