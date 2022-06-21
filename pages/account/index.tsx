import Link from "next/link";
import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "../../components/layouts/layout";
import styles from "./Index.module.scss";
import { getAllUser, searchUser } from "../../services/user.service";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { getAllRoles } from "../../services/role.service";
import { Field } from "formik";
import SimpleForm from "../../components/account/simpleForm/simpleForm";
import SocieteForm from "../../components/account/societeForm/societeForm";
import AddCustomerModal from "./add";

const IndexPage = () => {
  const [allUser, setAllUser] = useState([] as any);
  const [detailsActive, setDetailsActive] = useState(false);
  const router = useRouter();
  const {roleId, status, search} = router.query

  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentItems, setCurrentItems] = useState([{} as any]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [allRoles, setAllRole] = useState([]);

  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [searchValue, setSearchValue] = useState({
    status: status != undefined ? status : "all",
    search: search != undefined ? search : "",
    roleId: roleId != undefined ? roleId : "0",
  });

  useEffect(() => {  
    getAllRole();
  }, []);

  const getAllRole = () => {
    getAllRoles()
      .then((res) => {
        setAllRole(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (
      searchValue.roleId != "all" ||
      searchValue.search != "" ||
      searchValue.status != "all"
    ) {
       combiFilter(searchValue);
    }
  }, [searchValue]);

  const combiFilter = (filter: any) => {
    router.push({
      pathname: "/account",
      query: {
        roleId: encodeURI(filter.roleId),
        status: encodeURI(filter.status),
        search: encodeURI(filter.search),
      },
    });
    filterUsers(`/account?roleId=${filter.roleId}&status=${filter.status}&search=${filter.search}`)
  };

  const filterUsers = (query: any) => {
    searchUser(query)
      .then((res) => {
        setAllUser(res);
        setItemOffset(0)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allUser?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allUser?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allUser]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % allUser.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleSearch = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setSearchValue({ ...searchValue, [name]: value });
  };

  const findListUserByFilter = (query: any) => {
    searchUser(query)
      .then((res) => {
        setAllUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findAllUser = () => {
    getAllUser()
      .then((res) => {
        setAllUser(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [allUser]);

  useEffect(() => {}, [detailsActive]);

  // useEffect(() => {
  //   (async () => {
  //     getAllUser()
  //       .then((res) => {
  //         setAllUser(res?.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   })();
  // }, []);

  const voirDetails = (user: any) => {
    router.push(`/account/${user.id}`);
  };

  /************************
   * ADD USER START
   ************************/
  const [typeSelected, setTypeSelected] = useState({
    simpleSelected: true,
    societeSelected: false,
  });

  useEffect(() => {}, [typeSelected]);

  const onChangeAccountType = (e: any) => {
    const target = e.target;
    const value = target.value;
    const checked = target.checked;

    if (value === "simpleSelected") {
      setTypeSelected({
        simpleSelected: true,
        societeSelected: false,
      });
    }
    if (value === "societeSelected") {
      setTypeSelected({
        simpleSelected: false,
        societeSelected: true,
      });
    }
  };
  /************************
   * ADD USER END
   ************************/

  return (
    <Layout>
      <div className="pagetitle">
        <h1>Liste des comptes utilisateurs</h1>
      </div>

      <div className="card custom-card">
        <div className="card-header">
          <div className="ava-filter">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="d-flex flex-row justify-content-between align-items-center flex-wrap"
            >
              <div className="my-2">
                <button
                  className={`btn ava-btn-normal btn-next  ml-5 ${styles.hoverwarning}`}
                  data-bs-toggle="modal"
                  data-bs-target="#basicModal"
                >
                  <i className="bi bi-pencil-square"></i> Créer utilisateur
                </button>
              </div>
              <div className="filtre-role my-2">
                <select
                  className="form-select custom-form-control"
                  id="inputGroupSelect01"
                  onChange={handleSearch}
                  name="roleId"
                  value={searchValue.roleId}
                >
                  <option defaultValue="" value="0">
                    Tous les rôles
                  </option>
                  {allRoles?.map(({ id, name }) => {
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="filtre-role my-2">
                <select
                  className="form-select custom-form-control"
                  id="inputGroupSelect02"
                  onChange={handleSearch}
                  name="status"
                  value={searchValue.status}
                >
                  <option defaultValue="" value="all">
                    Tous les status
                  </option>
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>

              <div className="filter-search">
                <div className="form-floating">
                  <input
                    type="text"
                    name="search"
                    className="form-control ava-form"
                    id="floatingSearch"
                    onChange={handleSearch}
                    placeholder="Recherche"
                    value={searchValue.search}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  />
                  <label htmlFor="floatingSearch">Recherche</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Société
                  </th>
                  <th scope="col" className="text-center">
                    Prénom
                  </th>
                  <th scope="col" className="text-center">
                    Nom
                  </th>
                  <th scope="col" className="text-center">
                    Téléphone
                  </th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th scope="col" className="text-center">
                    Rôle
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems?.map((user, index) => {
                    return (
                      <Fragment key={index}>
                        <tr
                          onClick={() => {
                            voirDetails(user);
                          }}
                        >
                          <td className="text-center">
                            {user?.customers?.[0]?.companyName.length > 0 ? (
                              user?.customers?.[0]?.companyName
                            ) : (
                              <span className="badge bg-primary">Aucun</span>
                            )}
                          </td>
                          <td className="text-center">{user.lastName}</td>
                          <td className="text-center">{user.firstName}</td>
                          <td className="text-center">{user.phone}</td>
                          <td className="text-center">
                            {user.isActif ? (
                              <span
                                className="badge bg-success"
                                style={{ width: "80px" }}
                              >
                                Activé
                              </span>
                            ) : (
                              <span
                                className="badge bg-danger"
                                style={{ width: "80px" }}
                              >
                                Desactivé
                              </span>
                            )}
                          </td>
                          <td className="text-center">{user?.role?.name}</td>
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
            //  renderOnZeroPageCount={}
          />
        </nav>
      </div>

      <div className="modal fade" id="basicModal" tabIndex={-1}>
        <div className="modal-dialog modal-fullscreen">
          <AddCustomerModal allUser={allUser} setAllUser={setAllUser} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;


IndexPage.getInitialProps = async ( query: any) => {
  const {roleId, status, search} = query
  return {roleId, status, search}
}