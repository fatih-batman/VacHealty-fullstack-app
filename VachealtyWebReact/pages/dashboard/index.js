import { useEffect, useState, useRef  } from "react";
import { useSelector } from "react-redux";
import { dashboardService } from "../../firebase/services/dashboard-service";
import Layout from "../../components/layout";
import CardForDashboard from "../../components/ui/card/cardForDashboard"
import {useRouter} from "next/router";
import Link from "next/link";


const Dashboard = () => {
  const SINOVAC = "Sinovac";
  const BIONTECH = "BioNTech";
  const SPUTNIKV = "SputnikV";
  const TURKOVAC = "TurkoVac";

  const user = useSelector((state) => {return state;});
  const router = useRouter();
  const ref = useRef(null);
  const ref2 = useRef(null);

  const [users, setUsers] = useState("");
  const [userSinovac, setUserSinovac] = useState(0);
  const [userBiontech, setUserBiontech] = useState(0);
  const [userTurkovac, setUserTurkovac] = useState(0);
  const [rateSinovac, setRateSinovac] = useState(0);
  const [rateBiontech, setRateBiontech] = useState(0);
  const [rateTurkovac, setRateTurkovac] = useState(0);


  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [mostRecentEvent, setMostRecentEvent] = useState();
  const [cardHeight, setCardHeight] = useState();

  useEffect(() => {
    renderUsers();
  }, []);



  const renderUsers = async () => {
    try {
      const users = await dashboardService
          .getUsers()
          .then((response) => {
              setUsers(response);
              let countSinovac = 0;
              let countBio = 0;
              let countTurko = 0;
              let countUser = 0;
              response.map( (user) =>{
                console.log("user",user);
                countUser+=1;

                const stDoseOfVaccine = 'stDoseOfVaccine';
                let SinovacBool=false;
                let BioBool=false;
                let TurkoBool=false;
                for (let i=1;i<5;i++){
                  let stDoseOfVaccineX = stDoseOfVaccine + i.toString();
                  if(user[stDoseOfVaccineX] === SINOVAC) SinovacBool=true;
                  if(user[stDoseOfVaccineX] === BIONTECH) BioBool=true;
                  if(user[stDoseOfVaccineX] === TURKOVAC) TurkoBool=true;
                }
                if(SinovacBool === true) countSinovac+=1;
                if(BioBool === true) countBio+=1;
                if(TurkoBool === true) countTurko+=1;

              })
              setUserSinovac(countSinovac);
              setRateSinovac(countSinovac*100/countUser);
              setUserBiontech(countBio);
              setRateBiontech(countBio*100/countUser);
              setUserTurkovac(countTurko);
              setRateTurkovac(countTurko*100/countUser);
              //console.log("userSINOVAC",userSinovac);
              return response;
          });
    } catch (err) {
      console.log(+err);
    }
  };


  return (
      <div>
        <Layout >
          <div className="container ">
            <div className="row row-eq-height marginTop30">
                <div className="title col-12">
                    <h4>Dashboard</h4>
                    <p>Information about individuals vaccine preferences.</p>
                </div>
            </div>
            <div className="row row-eq-height marginTop30">
              <div className="col-12 col-md-4 my-auto p-3">
                <CardForDashboard upper="Number of people who had the Sinovac vaccine" lower="Rate" right={userSinovac}
                                  rate={rateSinovac} referans={ref2}/>
              </div>

              <div className="col-12 col-md-4 my-auto p-3" >
                <CardForDashboard upper="Number of people who had the BioNTech vaccine" lower="Rate"
                                  right={userBiontech} rate={rateBiontech}/>
              </div> {/* /col-12 col-md-4 */}

              <div className="col-12 col-md-4 my-auto">
                <CardForDashboard upper="Number of people who had the TurcoVac vaccine" lower="Rate"
                                  right={userTurkovac} rate={rateTurkovac}/>
              </div>

            </div>



          </div>
        </Layout>
      </div>
  );
};

const cardImageTop ={
  width: "100%",
  //height: "auto",
  backgroundColor:'blue',
  padding:'0',
  margin:'0',
  maxHeight:'250px'
}

const marginBottom0 = {
  marginBottom:'0px'
}


export default Dashboard;
