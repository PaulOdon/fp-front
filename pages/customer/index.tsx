import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import Select from "react-select";
import Layout from "../../components/layouts/layout";
import * as customerService from "../../services/customer.service";
import CreateCustomer from "./add";
import ReactPaginate from "react-paginate";
import { searchCustomer } from "../../services/customer.service";
import { useRouter } from "next/router";

const IndexPage = () => {
  const [customers, setCustomers] = useState([]);
  // const [type, setType] = useState("");
  // const [isActif, setIsActif] = useState();
  const [clients, setClients] = useState([]);

  const [itemsPerPage, setItemsPerPage] = React.useState(9);
  const [currentItems, setCurrentItems] = useState([{} as any]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const router = useRouter();

  const { type, isActif } = router.query;

  const [searchValue, setSearchValue] = useState({
    type: type != undefined && type != "all" ? type : "",
    isActif: isActif != undefined && isActif != "all" ? isActif : "1",
  });

  const typeOptions = [
    { value: "", label: "Tous" },
    { value: "SOCIETE", label: "Société" },
    { value: "PARTICULIER", label: "Particulier" },
  ];

  const isActifOptions = [
    { value: -1, label: "Tous" },
    { value: true, label: "Actif" },
    { value: false, label: "Inactif" },
  ];

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(customers?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(customers?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, customers]);

  const lastestCreatedCustomer = (customer: never) => {
    const temp_customers = [...customers];
    temp_customers.unshift(customer);
    setCustomers(temp_customers);
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  async function fetchCustomer() {
    let data = await customerService.fetchCustomers();
    setCustomers(data);
  }
  const selectStyle = {
    control: (base: any) => ({
      ...base,
      borderRadius: 20,
    }),
  };

  useEffect(() => {
    if (
      (searchValue.isActif != "" && searchValue.isActif != "all") ||
      (searchValue.type != "" && searchValue.type != "all")
    ) {
      combiFilter();
    }
  }, [searchValue]);

  const handleChangeSearch = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const combiFilter = () => {
    router.push({
      pathname: "/customer",
      query: {
        isActif: encodeURI(searchValue.isActif.toString()),
        type: encodeURI(searchValue.type.toString()),
      },
    });

    filterCustomer(
      `/customer?isActif=${searchValue.isActif}&type=${searchValue.type}`
    );
  };

  const filterCustomer = (query: any) => {
    searchCustomer(query)
      .then((res) => {
        //  console.log(res)
        setCustomers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Clients</h1>
      </div>

      <section className="section customer">
        <div className="row mb-5">
          <div className="col-md-4">
            <button
              className="btn ava-btn-normal btn-next"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
            >
              <i className="bi bi-plus"></i> Créer un compte client
            </button>
          </div>
          <div className="col-md-4">
            <select
              style={{ padding: "0.95rem" }}
              className="form-select form-control ava-form"
              id="inputGroupSelect01"
              name="isActif"
              value={searchValue.isActif}
              onChange={handleChangeSearch}
            >
              <option value="2">Tous les status</option>
              <option value="1" defaultValue="1">Actif</option>
              <option value="0">Inactif</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              style={{ padding: "0.95rem" }}
              className="form-select form-control ava-form"
              id="inputGroupSelect01"
              name="type"
              value={searchValue.type}
              onChange={handleChangeSearch}
            >
              <option value="all">Tous les types</option>
              <option value="SOCIETE">Société</option>
              <option value="PARTICULIER">Particulier</option>
            </select>
          </div>
        </div>

        <div className="row">
          {currentItems &&
            currentItems.map((customer: any, index) => (
              <div className="col-xxl-3 col-md-4" key={index}>
                <CustomerCard
                  id={customer.id}
                  lastName={customer.lastName}
                  firstName={customer.firstName}
                  city={customer.city}
                  company={customer.companyName}
                />
              </div>
            ))}
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

        <CreateCustomer
          id="basicModal"
          lastestCreatedCustomer={lastestCreatedCustomer}
        />
      </section>
    </Layout>
  );
};

const CustomerCard = (props: any) => (
  <div className="card info-card sales-card">
    <Link href={`/customer/${props.id}`}>
      <a>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="card-image rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-building"></i>
            </div>
            <div className="ps-3">
              <h6>
                {props.lastName}
                {" " + props.firstName}
              </h6>
              <span className="text-muted small">{props.company}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default IndexPage;

IndexPage.getInitialProps = async (query: any) => {
  const { type, isActif } = query;
  return { type, isActif };
};
