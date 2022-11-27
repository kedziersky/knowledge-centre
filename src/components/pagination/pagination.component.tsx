import { Box, Icon } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";
export const Pagination = ({
  pageCount,
  setPage,
  page,

  forcePage,
}: any) => {
  const handlePageClick = ({ selected }: any) => {
    setPage(selected);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box className={styles.paginationWrapper}>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={<Icon as={FaChevronLeft} />}
        nextLabel={<Icon as={FaChevronRight} />}
        breakLabel={"..."}
        breakClassName={"break"}
        containerClassName={"pagination"}
        activeClassName={"active"}
        onPageChange={handlePageClick}
      />
    </Box>
  );
};
