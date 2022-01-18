import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import _ from "lodash";
import MockData from "../MOCK_DATA.json";

//pagesize
const pageSize = 10;

const TableData = (props) => {
  const [data, setData] = useState(MockData);

  //order by which sorting is done
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);

  //data on specific page
  const [paginatedData, setPaginatedData] = useState(
    _(filteredData).slice(0).take(pageSize).value()
  );
  
  //tempdata is data after applying the filter on actual data 
  useEffect(() => {
    const tempData = data.filter((val) => {
      if (props.searchTerm === "") {
        return val;
      } else if (
        val.first_name.toLowerCase().includes(props.searchTerm.toLowerCase())
      ) {
        return val;
      }
    });
    console.log(tempData);
    setFilteredData(tempData);
  }, [props.searchTerm]);

  //pagecount=stores dynamic page count
  const pageCount = filteredData
    ? Math.ceil(filteredData.length / pageSize)
    : 0;

  //total no of pages
  const pages = _.range(1, pageCount + 1);

  //Pagination function to get data entries of specific page
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(filteredData)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedData(paginatedPost);
  };

  //sorting function to sort the column after clicking on column head
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...filteredData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setFilteredData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      const sorted = [...filteredData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setFilteredData(sorted);
      setOrder("ASC");
    }
    pages.map((page) => pagination(page));
  };

  return (
    <div className="container">
      <Table table table-bordered striped bordered mt-2>
        <thead className="thead-dark">
          <tr>
            <th
              onClick={() => {
                sorting("first_name");
              }}
            >
              First Name
            </th>
            <th
              onClick={() => {
                sorting("last_name");
              }}
            >
              Last Name
            </th>
            <th
              onClick={() => {
                sorting("email");
              }}
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData
            .filter((val) => {
              if (props.searchTerm === "") {
                return val;
              } else if (
                val.first_name
                  .toLowerCase()
                  .includes(props.searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableData;
