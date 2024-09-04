import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Pagination from "./Pagination";
import mockdata from "./mock-data.json";
import usePagination from "./Hooks/usePagination";
import NewDocumentForm from "./Components/NewDocumentForm";
import useLocalStorage from "./Hooks/useLocalStorage";
import Filter from "./Components/Filter";

function App() {
  const [itemsPerPage, setItemsPerPage] = useState(5); // can extend later
  const [showNewDocumentForm, setShowNewDocumentForm] = useState(false);
  const [data, setData] = useLocalStorage("data", mockdata);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("simple");
  const { goToPage, paginatedData, pageIndex } = usePagination({
    originalData: filteredData,
    itemsPerPage
  });

  const handleAddNewDocument = newDocument => {
    setData([...data, newDocument]);
  };

  useEffect(() => {
    const filterData = data.filter(p => p.type === activeFilter);
    setFilteredData(filterData);
  }, [activeFilter, data]);

  const handleDelete = id => {
    const filterData = data.filter(p => p.id !== id);
    setData(filterData);
  };

  return (
    <div className="App">
      <div className="main-content">
        <div>
          <ToastContainer />
        </div>
        {showNewDocumentForm && (
          <NewDocumentForm
            addNewDocument={handleAddNewDocument}
            setShowNewDocumentForm={setShowNewDocumentForm}
          />
        )}
        {!showNewDocumentForm && (
          <>
            <button
              onClick={() => {
                setShowNewDocumentForm(true);
              }}
            >
              Add new document
            </button>
            <div className="card-container">
              <h1>Documents</h1>
              <Filter
                setActiveFilter={setActiveFilter}
                activeFilter={activeFilter}
              />
              {filteredData.length === 0 && <div>No data!</div>}
              {paginatedData &&
                paginatedData.map((d, index) => {
                  return (
                    <>
                      <div className="card" key={index}>
                        {d.title}
                        {d.text}
                        {d.image && (
                          <img
                            src={d.image}
                            alt={d.title}
                            height={"40px"}
                            width={"40px"}
                          ></img>
                        )}
                        <button
                          onClick={() => {
                            handleDelete(d.id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </>
                  );
                })}
            </div>
            <Pagination
              pages={Math.ceil(filteredData.length / itemsPerPage)}
              goToPage={goToPage}
              pageIndex={pageIndex}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
