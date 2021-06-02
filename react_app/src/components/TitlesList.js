import React, { useState, useEffect, useMemo, useRef } from "react";
import TitleDataService from "../services/TitleService";
import { useTable } from "react-table";

const TitlesList = (props) => {
    const [titles, setTitles] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const titlesRef = useRef();
  
    titlesRef.current = titles;
  
    useEffect(() => {
        retrieveTitles();
    }, []);
  
    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
  
    const retrieveTitles = () => {
      TitleDataService.getAll()
        .then((response) => {
            setTitles(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveTitles();
    };
  
    const findByTitle = () => {
      TitleDataService.findByTitle(searchTitle)
        .then((response) => {
            setTitles(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const openTitle = (rowIndex) => {
        const id = titlesRef.current[rowIndex].id;
    
        props.history.push("/titles/" + id);
    };
    
    const deleteTitle = (rowIndex) => {
        const id = titlesRef.current[rowIndex].id;
    
        TitleDataService.remove(id)
        .then((response) => {
            props.history.push("/titles");
    
            let newTitles = [...titlesRef.current];
            newTitles.splice(rowIndex, 1);
    
            setTitles(newTitles);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    
    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Director",
                accessor: "director",
            },
            {
                Header: "Cast",
                accessor: "cast",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Country",
                accessor: "country",
            },
            {
                Header: "Date Added",
                accessor: "dateAdded",
            },
            {
                Header: "Release Year",
                accessor: "releaseYear",
            },
            {
                Header: "Rating",
                accessor: "rating",
            },
            {
                Header: "Duration",
                accessor: "duration",
            },
            {
                Header: "Listed In",
                accessor: "listedIn",
            },
        ],
        []
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: titles,
    });
    
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title containing"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByTitle}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-12 list">
                <table
                className="table table-striped table-bordered"
                {...getTableProps()}
                >
                <thead>
                    {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            );
                        })}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
    
        </div>
    );
};
    
export default TitlesList;