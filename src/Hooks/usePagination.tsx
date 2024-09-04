import { useEffect, useState } from "react";

interface Iprops {
  originalData: any[];
  itemsPerPage: number;
}

const usePagination = (props: Iprops) => {
  const [page, setPage] = useState(0);
  const [paginatedData, setPaginatedData]: any = useState([]);
  const { originalData, itemsPerPage } = props;

  const goToPage = (pageIndex: number) => {
    setPage(pageIndex);
  };

  const nextPage = () => {
    setPage(p => p + 1);
  };

  const prevPage = () => {
    setPage(p => p - 1);
  };

  useEffect(() => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = originalData.slice(startIndex, endIndex);
    setPaginatedData(paginated);
  }, [itemsPerPage, originalData, page]);

  return {
    nextPage,
    prevPage,
    goToPage,
    paginatedData,
    pageIndex: page
  };
};

export default usePagination;
