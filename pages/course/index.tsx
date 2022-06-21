import Link from "next/link";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import { getAllCourse } from "../../services/course.service";
import Moment from "react-moment";
import "moment-timezone";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import * as customerService from "../../services/customer.service";
import { getAllStatus } from "../../services/status.service";
import OneEntrieTable from "../../components/pages/course/OneEntrieTable";
import {
  searchDemande,
  searchDemandeByCustomerId,
} from "../../services/demande.service";
import { getAllCourseByCustomerId } from "../../services/course.service";
import { useAuth } from "../../context/auth/UseAuth";

const IndexPage = () => {
  const [allCourse, setAllCourse] = useState([{} as any]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentItems, setCurrentItems] = useState([{} as any]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [typeOptions, setTypeOptions] = useState([{} as any]);
  const [allStatus, setAllStatus] = useState([{} as any]);

  const router = useRouter();

  const { dateDebut, dateFin, search, statusId, customerId } = router.query;

  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user.role?.name === "Client") {
      setIsClient(true);
      fetchAllCoursByCustomerId();
    }
    if (user.role?.name != "Client") {
      fetchAllCourse();
    }
    fetchAllCustomer();
    fetchAllStatus();
  }, []);

  useEffect(() => {
    addAllCustomersInSelect(allCustomers);
  }, [allCustomers]);

  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: "2.25rem",
      padding: "0.55rem 0.55rem",
    }),
  };

  const fetchAllCustomer = () => {
    customerService
      .fetchCustomers()
      .then((res) => {
        setAllCustomers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllStatus = () => {
    getAllStatus()
      .then((res) => {
        setAllStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addAllCustomersInSelect = (allcustomer: any) => {
    const selectAll = {
      label: "Tous",
      value: "0",
      lastName: "",
      id: "0",
    };
    allcustomer.map((customer: any) => {
      customer.value = customer.id;
      customer.label = customer.firstName;
    });
    allcustomer.unshift(selectAll);
    setTypeOptions(allcustomer);
  };

  const getOptionValueSelect = (id: any) => {
    let selectedOption = {} as any;
    typeOptions.map((option) => {
      if (option.id === parseInt(id)) {
        selectedOption = option;
      }
    });
    return selectedOption;
  };

  const [searchValue, setSearchValue] = useState({
    dateDebut: dateDebut != undefined && dateDebut != " " ? dateDebut : "",
    dateFin: dateFin != undefined && dateFin != " " ? dateFin : "",
    search: search != undefined && search != " " ? search : "",
    statusId: statusId != undefined && statusId != "0" ? statusId : "0",
    customerId: customerId != undefined && customerId != "0" ? customerId : "0",
  });

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % allCourse.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allCourse?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allCourse?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allCourse]);

  const fetchAllCourse = () => {
    getAllCourse()
      .then((res) => {
        setAllCourse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllCoursByCustomerId = () => {
    getAllCourseByCustomerId(user.customers[0].id)
      .then((res) => {
        setAllCourse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      searchValue.dateDebut != "" ||
      searchValue.dateFin != "" ||
      searchValue.search != "" ||
      searchValue.statusId != "0" ||
      searchValue.customerId != "0"
    ) {
      combiFilter();
    }
  }, [searchValue]);

  const combiFilter = () => {
    router.push({
      pathname: "/course",
      query: {
        dateDebut: encodeURI(searchValue.dateDebut.toString()),
        dateFin: encodeURI(searchValue.dateFin.toString()),
        statusId: encodeURI(searchValue.statusId.toString()),
        customerId: encodeURI(searchValue.customerId.toString()),
        search: encodeURI(searchValue.search.toString()),
      },
    });
    filterDemande(
      `/course?dateDebut=${searchValue.dateDebut}&dateFin=${searchValue.dateFin}&statusId=${searchValue.statusId}&customerId=${searchValue.customerId}&search=${searchValue.search}`
    );
  };

  const filterDemande = (query: any) => {
    if (user.role?.name === "Client") {
      searchDemandeByCustomerId(query, user.customers[0].id)
        .then((res) => {
          setAllCourse(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (user.role?.name != "Client") {
      searchDemande(query)
        .then((res) => {
          setAllCourse(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeSearch = (event: any) => {
    if (event?.target) {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      if (value === "") {
        setSearchValue({ ...searchValue, [name]: " " });
      } else {
        switch (name) {
          case "dateDebut":
            if (searchValue.dateFin.length > 5) {
              const dFin = new Date(searchValue.dateFin.toString());
              const dDeb = new Date(value.toString());
              if (dDeb === dFin) {
                setSearchValue({ ...searchValue, [name]: value });
              }
              if (dDeb > dFin) {
                setSearchValue({
                  ...searchValue,
                  dateDebut: value,
                  dateFin: value,
                });
              }
              if (dDeb < dFin) {
                setSearchValue({ ...searchValue, [name]: value });
              }
            } else {
              setSearchValue({ ...searchValue, [name]: value });
            }
            break;

          case "dateFin":
            if (searchValue.dateDebut.length > 5) {
              const dFin = new Date(value.toString());
              const dDeb = new Date(searchValue.dateDebut.toString());
              if (dDeb === dFin) {
                setSearchValue({ ...searchValue, [name]: value });
              }
              if (dDeb > dFin) {
                setSearchValue({
                  ...searchValue,
                  dateDebut: value,
                  dateFin: value,
                });
              }
              if (dDeb < dFin) {
                setSearchValue({ ...searchValue, [name]: value });
              }
            } else {
              setSearchValue({ ...searchValue, [name]: value });
            }

            break;

          default:
            setSearchValue({ ...searchValue, [name]: value });
            break;
        }
      }
    } else {
      if (event?.id) {
        setSearchValue({ ...searchValue, ["customerId"]: event.id });
      }
    }
  };

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Suivi des demandes</h1>
      </div>
      <div className="card custom-card">
        <div className="card-header">
          <div className="d-flex flex-row justify-content-around flex-wrap">
            <div className="form-floating">
              <input
                type="date"
                className="form-control ava-form"
                id="floatingDateStart"
                placeholder="Date d'enlèvement souhaité"
                name="dateDebut"
                onKeyPress={(e) => {
                  e.preventDefault();
                  return false;
                }}
                value={searchValue.dateDebut}
                onChange={handleChangeSearch}
              />
              <label htmlFor="floatingDateStart">Date début</label>
            </div>
            <div className="form-floating">
              <input
                type="date"
                className="form-control ava-form"
                id="floatingDateStart"
                placeholder="Date d'enlèvement souhaité"
                name="dateFin"
                onKeyPress={(e) => {
                  e.preventDefault();
                  return false;
                }}
                value={searchValue.dateFin}
                onChange={handleChangeSearch}
              />
              <label htmlFor="floatingDateStart">Date fin</label>
            </div>
            <div className="filter-search">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control ava-form"
                  id="floatingSearch"
                  placeholder="Recherche"
                  name="search"
                  value={searchValue.search}
                  onChange={handleChangeSearch}
                />
                <label htmlFor="floatingSearch">N° de la course</label>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <Select
                isClearable={true}
                options={typeOptions}
                getOptionLabel={(option) =>
                  `${option.label} ${option.lastName}`
                }
                styles={selectStyle}
                isSearchable
                placeholder="Client"
                name="customerId"
                value={
                  Object.keys(getOptionValueSelect(searchValue.customerId))
                    .length != 0
                    ? getOptionValueSelect(searchValue.customerId)
                    : ""
                }
                onChange={handleChangeSearch}
                isDisabled={isClient}
              />
            </div>
            <div className="col-md-4">
              <select
                style={{ padding: "0.95rem" }}
                className="form-select form-control ava-form"
                id="inputGroupSelect01"
                name="statusId"
                value={searchValue.statusId}
                onChange={handleChangeSearch}
              >
                <option key={"null"} value=" ">
                  Tous les status
                </option>
                {allStatus?.map(({ id, name }, index) => {
                  return (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table  table-hover custom-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Demande
                  </th>
                  <th scope="col" className="text-center">
                    Créateur
                  </th>
                  <th scope="col" className="text-center">
                    Client
                  </th>
                  <th scope="col" className="text-center">
                    Adr. Livraison
                  </th>
                  <th scope="col" className="text-center">
                    Enlèv./Récep.
                  </th>
                  <th scope="col" className="text-center">
                    Livraison
                  </th>
                  <th scope="col" className="text-center">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems?.map((cours, index) => {
                    return (
                      <Fragment key={index}>
                        <OneEntrieTable
                          allStatus={allStatus}
                          cours={cours}
                          index={index}
                        />
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ReactPaginate
            className="pagination justify-content-center"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            breakLabel="..."
            nextLabel="Suivant"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Précedent"
            //  renderOnZeroPageCount={}
          />
        </nav>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async (query: any) => {
  const { dateDebut, dateFin, search, statusId, customerId } = query;
  return { dateDebut, dateFin, search, statusId, customerId };
};
