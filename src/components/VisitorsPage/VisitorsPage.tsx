/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VisitorsTable } from "../VisitorsTable/VisitorsTable"
import { useEffect, useState } from "react";
import { Visitor } from "../../types/Visitor";
import { useSearchParams } from "react-router-dom";
import { getAllVisitors } from "../../api/visitors";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";

export const VisitorsPage = () => {
  const [users, setUsers] = useState<Visitor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [serachParams, setSearchParams] = useSearchParams({});
  const [searchQuery, setSearchQuery] = useState("");
  const value = serachParams.get('tenant');
  let pageSize = 10;
  const [allUsers, setAllUsers] = useState<Visitor[]>([]);

  useEffect(() => {
    getAllVisitors(value || '', currentPage, pageSize = 10000, searchQuery)
      .then(setAllUsers)
      .catch(() => {
        alert('Something went wrong');
      });
  }, []);

  const handlePagination = async (currentPage: number) => {
    try {
      setCurrentPage(currentPage);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    getAllVisitors(value || '', currentPage, pageSize, searchQuery)
      .then(setUsers)
      .catch(() => {
        alert('Something went wrong');
      });
  }, [value, currentPage, searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="visitorsPage__wrapper">
      <div className="data-container">
      <VisitorsTable
          visitors={users}
          value={value}
        />
        <Pagination
          currentPage={currentPage}
          handlePagination={handlePagination}
          allLength={allUsers.length}
        />
      </div>
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handlePagination={handlePagination}
          value={value}
        />
    </div>
  )
}