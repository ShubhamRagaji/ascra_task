import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import search from "../../Assests/search.png";
import profileIcon from "../../Assests/profileIcon.png";
import "./clientsLists.scss";
import Scroller from "../../Components/ScrollBar/ScrollBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClientsList() {
  const navigate = useNavigate();

  const [clientsData, setclientsData] = useState([]);
  const [searchedClientsData, setsearchedClientsData] = useState([]);
  const [noDataFound, setnoDataFound] = useState(false);

  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("accessToken"));
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("/api/resource/Client", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let data = JSON.parse(result);
        setclientsData(data.data);
        setsearchedClientsData(data.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="clientlist_wrapper">
      <Navbar>
        <div className="clients_topbar">
          <div className="clients_label">
            <h4 className="top_header">Clients</h4>
            <p className="client_sublabel">It's all about customers.</p>
          </div>

          <div className="search_wrapper">
            <div className="search_container">
              <img src={search} alt="" className="search" />
              <input
                type="text"
                className="search_superadmin"
                placeholder="Search here"
                onChange={(e) => {
                  let _data = [];

                  clientsData.map((item) => {
                    if (
                      item.name
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase())
                    ) {
                      _data.push(item);
                    }
                  });

                  setsearchedClientsData(_data);

                  _data.length === 0
                    ? setnoDataFound(true)
                    : setnoDataFound(false);
                }}
              />
            </div>
          </div>
        </div>

        <div className="divider" />
        <div className="clients_cards_wrapper">
          {noDataFound && <p className="noClients">No Clients Found</p>}
          <Scroller
            autoHeightMax="62vh"
            verticalStyle={{
              width: "0.12vw",
              backgroundColor: "#283e92",
              marginLeft: "0.2vw",
            }}
          >
            <div className="client_info_card">
              {searchedClientsData?.map((item, index) => (
                <div className="main_card" key={"client" + index}>
                  <div className="client_profile">
                    <img src={profileIcon} alt="" className="profile_icon" />
                    <p className="name">{item.name.split("-")[0]} </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/form/" + item.name);
                    }}
                    className="vw_edit_btn"
                  >
                    View / Edit
                  </button>
                </div>
              ))}
            </div>
          </Scroller>
        </div>
      </Navbar>
    </div>
  );
}
