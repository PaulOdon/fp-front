import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layouts/layout";
import styles from "../styles/Home.module.scss";
import * as authService from "../services/auth.service";
import Can from "../context/auth/Can";
import {
  getDashboard,
  getDashboardByCustomerId,
  getDashboardStatistique,
  getDashboardStatistiqueByCustomerId,
} from "../services/dashboard.service";
import { useAuth } from "../context/auth/UseAuth";
import { useRouter } from "next/router";
import {
  filterDashboard,
  filterDashboardByCustomerId,
} from "../services/dashboard.service";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home: NextPage = () => {
  const [dashboard, setDashboard] = useState({} as any);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { value } = router.query;

  const [searchValue, setSearchValue] = useState({
    value: value != undefined ? value : "general",
  });

  const [filterValue, setFilterValue] = useState({
    filter: "12_jour",
  });

  const [chartValue, setChartValue] = useState({
    labels: [] as any,
    datasets: [] as any,
  });

  useEffect(() => {
    if (user.role?.name === "Client") {
      setIsClient(true);
      getCountAllByCustomerId();
    }
    if (user.role?.name != "Client") {
      getCountAll();
    }
  }, []);

  useEffect(() => {}, [dashboard]);

  const getCountAll = () => {
    getDashboard()
      .then((res) => {
        console.log(res);
        setDashboard(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCountAllByCustomerId = () => {
    getDashboardByCustomerId(user.customers[0].id)
      .then((res) => {
        setDashboard(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchValue.value != "") {
      dashFilter();
    }
  }, [searchValue]);

  const handleChangeSearch = (e: any) => {
    const target = e.target;
    const value = target.value;
    setSearchValue({ ...searchValue, ["value"]: value });
  };

  const dashFilter = () => {
    router.push({
      pathname: "/",
      query: {
        value: encodeURI(searchValue.value.toString()),
      },
    });

    filterDash(`filters?value=${searchValue.value}`);
  };

  const filterDash = (query: any) => {
    if (user.role?.name === "Client") {
      filterDashboardByCustomerId(query, user.customers[0].id)
        .then((res) => {
          setDashboard(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (user.role?.name != "Client") {
      filterDashboard(query)
        .then((res) => {
          setDashboard(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeFilter = (e: any) => {
    const target = e.target;
    const value = target.value;
    setFilterValue({ ...filterValue, ["filter"]: value });
  };

  useEffect(() => {
    if (filterValue.filter != "") {
      fetchDataForChart();
    }
  }, [filterValue]);

  useEffect(() => {}, [chartValue]);

  const fetchStatistical = (
    startDate: Date,
    endDate: Date,
    dateRange: any,
    typeSelect: any,
    axeX: any
  ) => {
    if (user.role?.name === "Client") {
      getDashboardStatistiqueByCustomerId(
        startDate,
        endDate,
        dateRange,
        typeSelect,
        user.customers[0].id
      )
        .then((res) => {
          setChartValue({
            labels: axeX,
            datasets: res,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (user.role?.name != "Client") {
      getDashboardStatistique(startDate, endDate, dateRange, typeSelect)
        .then((res) => {
          setChartValue({
            labels: axeX,
            datasets: res,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchDataForChart = () => {
    let label = [];
    let dateRanges = [];

    switch (filterValue.filter) {
      case "12_jour":
        const dateNow = new Date();
        const day = dateNow.getDate();
        const month = dateNow.getMonth();
        const year = dateNow.getFullYear();
        const startDate = new Date(year, month, day - 12);
        const endDate = new Date(year, month, day - 1);

        // get info start date
        const dayStart = startDate.getDate();
        const monthStart = startDate.getMonth();
        const yearStart = startDate.getFullYear();

        for (let index = 0; index < 12; index++) {
          label.push(
            new Date(
              yearStart,
              monthStart,
              dayStart + index
            ).toLocaleDateString()
          );
        }

        for (let index = 0; index < 12; index++) {
          dateRanges.push(
            new Date(yearStart, monthStart, dayStart + index).toISOString()
          );
        }
        fetchStatistical(startDate, endDate, dateRanges, "12_jour", label);

        break;
      case "12_semaine":
        const dateNowS = new Date();
        const dayS = dateNowS.getDate();
        const monthS = dateNowS.getMonth();
        const yearS = dateNowS.getFullYear();
        const startDateS = new Date(yearS, monthS, dayS - 7 * 12);
        const endDateS = new Date(yearS, monthS, dayS - 1);

        // get info start date
        const dayStartS = startDateS.getDate();
        const monthStartS = startDateS.getMonth();
        const yearStartS = startDateS.getFullYear();

        let tmpDateStart = dayStartS;

        for (let index = 0; index < 12; index++) {
          label.push(
            new Date(yearStartS, monthStartS, tmpDateStart)
              .toLocaleString()
              .slice(0, 10) +
              " au " +
              new Date(yearStartS, monthStartS, tmpDateStart + 7)
                .toLocaleString()
                .slice(0, 10)
          );
          tmpDateStart += 7 + 1;
        }

        let tmpDateStart1 = dayStartS;

        for (let index = 0; index < 12; index++) {
          dateRanges.push(
            new Date(yearStartS, monthStartS, tmpDateStart1).toISOString() +
              " " +
              [
                new Date(
                  yearStartS,
                  monthStartS,
                  tmpDateStart1 + 7
                ).toISOString(),
              ]
          );
          tmpDateStart1 += 7 + 1;
        }

        fetchStatistical(startDateS, endDateS, dateRanges, "12_semaine", label);

        break;
      case "12_mois":
        const dateNowM = new Date();
        const dayM = dateNowM.getDate();
        const monthM = dateNowM.getMonth();
        const yearM = dateNowM.getFullYear();
        const startDateM = new Date(yearM, monthM - 12, dayM);
        const endDateM = new Date(yearM, monthM - 1, dayM);

        // get info start date
        const dayStartM = startDateM.getDate();
        const monthStartM = startDateM.getMonth();
        const yearStartM = startDateM.getFullYear();

        for (let index = 1; index <= 12; index++) {
          label.push(
            new Date(yearStartM, monthStartM + index, dayStartM)
              .toLocaleDateString()
              .slice(3, 10)
          );
        }

        for (let index = 1; index <= 12; index++) {
          dateRanges.push(
            new Date(yearStartM, monthStartM + index, 2).toISOString()
          );
        }

        fetchStatistical(startDateM, endDateM, dateRanges, "12_mois", label);

        break;
      case "12_annee":
        const dateNowY = new Date();
        const dayY = dateNowY.getDate();
        const monthY = dateNowY.getMonth();
        const yearY = dateNowY.getFullYear();
        const startDateY = new Date(yearY - 12, monthY, dayY);
        const endDateY = new Date(yearY - 1, monthY, dayY);

        // get info start date
        const dayStartY = startDateY.getDate();
        const monthStartY = startDateY.getMonth();
        const yearStartY = startDateY.getFullYear();

        for (let index = 1; index <= 12; index++) {
          label.push(
            new Date(yearStartY + index, monthStartY, dayStartY)
              .toLocaleDateString()
              .slice(6, 10)
          );
        }

        for (let index = 1; index <= 12; index++) {
          dateRanges.push(
            new Date(yearStartY + index, monthStartY, dayStartY).toISOString()
          );
        }

        fetchStatistical(startDateY, endDateY, dateRanges, "12_annee", label);

        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="pagetitle-dashborad">
        <h1>Tableau de bord</h1>
      </div>

      <section className="section dashboard">
        <div className="ava-list-btn d-flex flex-row justify-content-around flex-wrap mb-4">
          <Link href="course/add">
            <a>
              <button className="btn btn-default ava-btn">
                <div className="ava-card-stat d-flex flex-column justify-content-center align-items-center">
                  <span className="ava-card-icon">
                    <i className="bi bi-plus-circle-fill"></i>
                  </span>
                  <span className="ava-card-text">Créer une demande</span>
                </div>
              </button>
            </a>
          </Link>
          <Link href="/course">
            <a>
              <button className="btn btn-default ava-btn">
                <div className="ava-card-stat d-flex flex-column justify-content-center align-items-center">
                  <span className="ava-card-icon">
                    <i className="bi bi-eye-fill"></i>
                  </span>
                  <span className="ava-card-text">Suivi des demandes</span>
                </div>
              </button>
            </a>
          </Link>
          <Link href="/help">
            <a>
              <button className="btn btn-default ava-btn">
                <div className="ava-card-stat d-flex flex-column justify-content-center align-items-center">
                  <span className="ava-card-icon">
                    <i className="bi bi-question-circle-fill"></i>
                  </span>
                  <span className="ava-card-text">Aide</span>
                </div>
              </button>
            </a>
          </Link>
        </div>
        <Can permissions={["user:read"]}>
          <div className="d-flex justify-content-start">
            <div className="">
              <select
                className="form-select form-control ava-form-data-filter"
                id="inputGroupSelect01"
                name="isActif"
                value={searchValue.value}
                onChange={handleChangeSearch}
              >
                <option value="general" defaultValue="general">
                  Filtre des données
                </option>
                <option value="1_jour">1 Jour</option>
                <option value="7_jour">7 Jour</option>
                <option value="30_jour">30 Jour</option>
                <option value="365_jour">365 Jour</option>
              </select>
            </div>
          </div>

          <div className="ava-list-stats d-flex flex-row justify-content-around flex-wrap mb-5">
            <div className="ava-stats ava-bg-primary">
              <div className="ava-stats-header d-flex flex-row justify-content-around mb-4">
                <i className="bi bi-check2-circle"></i>
                <span className="mt-4">{dashboard?.demandeEnregistrer}</span>
              </div>
              <div className="ava-stats-title text-center">
                <span>Courses enregistrées</span>
              </div>
            </div>
            <div className="ava-stats ava-bg-success">
              <div className="ava-stats-header d-flex flex-row justify-content-around mb-4">
                <i className="bi bi-envelope-check"></i>
                <span className="mt-4">{dashboard?.demandeLivrer}</span>
              </div>
              <div className="ava-stats-title text-center">
                <span>Demandes livrées</span>
              </div>
            </div>
            <div className="ava-stats ava-bg-warning">
              <div className="ava-stats-header d-flex flex-row justify-content-around mb-4">
                <i className="bi bi-mailbox"></i>
                <span className="mt-4">{dashboard?.demandeHorsPerimetre}</span>
              </div>
              <div className="ava-stats-title text-center">
                <span> Demandes hors périmètre</span>
              </div>
            </div>
            <div className="ava-stats ava-bg-danger">
              <div className="ava-stats-header d-flex flex-row justify-content-around mb-4">
                <i className="bi bi-envelope-exclamation"></i>
                <span className="mt-4">{dashboard?.demandeEnRetard}</span>
              </div>
              <div className="ava-stats-title text-center">
                <span>Demandes en Retard</span>
              </div>
            </div>
            <div className="ava-stats ava-bg-npai">
              <div className="ava-stats-header d-flex flex-row justify-content-around mb-4">
                <i className="bi bi-exclamation-diamond"></i>
                <span className="mt-4">{dashboard?.demandeNPAI}</span>
              </div>
              <div className="ava-stats-title text-center">
                <span>Demandes en NPAI</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex flex-row justify-content-start align-items-center">
                  <div style={{ margin: "10px", paddingTop: "7px" }}>
                    <h5>Suivi des courses au cours des</h5>
                  </div>
                  <div>
                    <select
                      className="form-select form-control ava-form"
                      id="inputGroupSelect01"
                      name="filter"
                      value={filterValue.filter}
                      onChange={handleChangeFilter}
                    >
                      <option value="12_jour" defaultValue="12_jour">
                        12 derniers jour
                      </option>
                      <option value="12_semaine">12 derniers semaine</option>
                      <option value="12_mois">12 derniers mois</option>
                      <option value="12_annee">12 derniers année</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <Bar
                    data={chartValue}
                    width={400}
                    height={400}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </Can>
      </section>
    </Layout>
  );
};

export default Home;

Home.getInitialProps = async (query: any) => {
  const { value } = query;
  return { value };
};

export const options = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  maintainAspectRatio: false,
};
