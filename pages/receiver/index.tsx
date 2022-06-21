import Link from "next/link";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import * as receiverService from "../../services/receiver.service";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import CreateReceiver from "./add";
import Select from "react-select";
import { useAuth } from "../../context/auth/UseAuth";
import { getAllReceiversByClientId } from "../../services/receiver.service";
import { fetchCustomers } from "../../services/customer.service";
import {
  searchReceiver,
  searchReceiverByCustomerId,
} from "../../services/receiver.service";

const IndexPage = () => {
  const [receivers, setReceivers] = useState([]);
  const router = useRouter();

  const { search, isNPAI, customerId } = router.query;

  //*****START***** */
  const [detailsActive, setDetailsActive] = useState(false);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentItems, setCurrentItems] = useState([{} as any]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [typeOptions, setTypeOptions] = useState([{} as any]);

  const [searchValue, setSearchValue] = useState({
    isNPAI: isNPAI != undefined ? isNPAI : "all",
    customerId: customerId != undefined && customerId != "0" ? customerId : "0",
    search: search != undefined && search != " " ? search : "",
  });

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(receivers?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(receivers?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, receivers]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % receivers.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {}, [detailsActive]);

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

  const viewDetails = (receiver: any) => {
    router.push(`/receiver/${receiver.id}`);
  };

  const lastestCreatedReceiver = (receiver: never) => {
    const temp_receivers = [...receivers];
    temp_receivers.unshift(receiver);
    setReceivers(temp_receivers);
  };

  const addAllCustomersInSelect = (allcustomer: any) => {
    const selectAll = {
      label: "Tous",
      value: "0",
      lastName: "",
      companyName: "",
      id: "0",
    };
    allcustomer.map((customer: any) => {
      customer.value = customer.id;
      customer.label = customer.firstName;
    });
    allcustomer.unshift(selectAll);
    setTypeOptions(allcustomer);
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const fetchAllCustomer = () => {
    fetchCustomers()
      .then((res) => {
        setAllCustomers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Autre  méthode START
  async function fetchAllReceivers() {
    const data = await receiverService.getAllReceivers();
    if (data) {
      setReceivers(data);
    }
  }

  const getOptionValueSelect = (id: any) => {
    let selectedOption = {} as any;
    typeOptions.map((option) => {
      if (option.id === parseInt(id)) {
        selectedOption = option;
      }
    });
    return selectedOption;
  };

  useEffect(() => {
    if (user.role?.name === "Client") {
      setIsClient(true);
      fetchAllReceiverByCustomerId();
    }
    if (user.role?.name != "Client") {
      fetchAllReceivers();
    }
  }, [user]);

  const fetchAllReceiverByCustomerId = () => {
    getAllReceiversByClientId(user.customers[0].id)
      .then((response) => {
        setReceivers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      searchValue.search != "" ||
      searchValue.isNPAI != "" ||
      searchValue.customerId != "0"
    ) {
      combiFilter();
    }
  }, [searchValue]);

  const handleChangeSearch = (event: any) => {
    if (event?.target) {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setSearchValue({ ...searchValue, [name]: value });
    } else {
      if (event?.id) {
        setSearchValue({ ...searchValue, ["customerId"]: event.id });
      }
    }
  };

  const combiFilter = () => {
    router.push({
      pathname: "/receiver",
      query: {
        isNPAI: encodeURI(searchValue.isNPAI.toString()),
        customerId: encodeURI(searchValue.customerId.toString()),
        search: encodeURI(searchValue.search.toString()),
      },
    });

    filterReceiver(
      `/receiver?isNPAI=${searchValue.isNPAI}&customerId=${searchValue.customerId}&search=${searchValue.search}`
    );
  };

  const filterReceiver = (query: any) => {
    if (user.role?.name === "Client") {
      searchReceiverByCustomerId(query, user.customers[0].id)
        .then((res) => {
          setReceivers(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (user.role?.name != "Client") {
      searchReceiver(query)
        .then((res) => {
          setReceivers(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Destinataires</h1>
      </div>

      <section className="section customer">
        <div className="row mb-4">
          <div className="col-md-4">
            <button
              className="btn ava-btn-normal btn-next"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
            >
              <i className="bi bi-plus"></i> Ajouter un destinataire
            </button>
          </div>
          <div className="col-md-2">
            <select
              style={{ padding: "0.95rem" }}
              className="form-select form-control ava-form"
              id="inputGroupSelect01"
              name="isNPAI"
              value={searchValue.isNPAI}
              onChange={handleChangeSearch}
            >
              <option value="all">Tous</option>
              {/* <option value="false"></option> */}
              <option value="true">NPAI</option>
            </select>
          </div>
          <div className="col-md-3">
            <Select
              isClearable={true}
              options={typeOptions}
              getOptionLabel={(option) => `${option.label} ${option.companyName}`}
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
          <div className="col-md-3">
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
              <label htmlFor="floatingSearch">Recherche</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Client
                  </th>
                  <th scope="col" className="text-center">
                    Prénom
                  </th>
                  <th scope="col" className="text-center">
                    Nom
                  </th>
                  <th scope="col" className="text-center">
                    Adresse
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems?.map((receiver, index) => {
                    return (
                      <Fragment key={index}>
                        <tr
                          onClick={() => {
                            viewDetails(receiver);
                          }}
                        >
                          <td className="text-center">
                            {receiver?.customer?.companyName.length >
                            0 ? (
                              receiver?.customer?.companyName
                            ) : (
                              <span className="badge bg-primary">Aucun</span>
                            )}
                          </td>
                          <td className="text-center">{receiver.lastName}</td>
                          <td className="text-center">{receiver.firstName}</td>
                          <td className="text-center">
                            {receiver.addressOne + ", " + receiver.addressTwo}
                          </td>
                        </tr>
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
          />
        </nav>
      </section>

      <CreateReceiver
        id="basicModal"
        lastestCreatedReceiver={lastestCreatedReceiver}
      />
    </Layout>
  );
};

export default IndexPage;

IndexPage.getInitialProps = async (query: any) => {
  const { search, isNPAI, customerId } = query;
  return { search, isNPAI, customerId };
};
