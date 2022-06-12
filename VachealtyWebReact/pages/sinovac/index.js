import {useRouter} from "next/router";
import Layout from "../../components/layout";
import {useSelector} from "react-redux";
import { useEffect, useState} from "react";
import Link from "next/link";
import {dashboardService} from "../../firebase/services/dashboard-service";
import {covidProcessService} from "../../firebase/services/covid-process-service";
import {userCovidProcessConstants} from "../../constant";

const Index = () => {
    const SINOVAC = "Sinovac";
    const router = useRouter();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const [sinovacUsersWithCovidProcessInfo, setSinovacUsersWithCovidProcessInfo] = useState([]);

    const [chestPain, setChestPain] = useState(null);
    const [cough, setCough] = useState(null);
    const [difficultyBreathing, setDifficultyBreathing] = useState(null);
    const [headache, setHeadache] = useState(null);
    const [tiredness, setTiredness] = useState(null);
    const [lossOfSpeechOrMovement, setLossOfSpeechOrMovement] = useState(null);
    const [lossSenseOfTasteOrSmell, setLossSenseOfTasteOrSmell] = useState(null);


    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/auth/login');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        renderProcess();
    }, []);

    useEffect(() => {
        calculateRate();
    }, [sinovacUsersWithCovidProcessInfo]);

    const calculateRate = () => {
        let chestPainCount=0;
        let chestPainTrueCount=0;
        let coughCount=0;
        let coughTrueCount=0;
        let difficultyBreathingCount=0;
        let difficultyBreathingTrueCount=0;
        let headacheCount=0;
        let headacheTrueCount=0;
        let tirednessCount=0;
        let tirednessTrueCount=0;
        let lossOfSpeechOrMovementCount=0;
        let lossOfSpeechOrMovementTrueCount=0;
        let lossSenseOfTasteOrSmellCount=0;
        let lossSenseOfTasteOrSmellTrueCount=0;
      sinovacUsersWithCovidProcessInfo.map( (person) =>{
          for (const key of Object.keys(userCovidProcessConstants)) {
              console.log("keyyyyyyyyy",userCovidProcessConstants[key]);
              console.log("PERSON",person);
              console.log("AAAAAAAAAAAA",person[ userCovidProcessConstants[key] ]);
              if (person[userCovidProcessConstants[key]]===true || person[userCovidProcessConstants[key]]===false){
                  if(userCovidProcessConstants[key]==='chestPain'){
                      chestPainCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) chestPainTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='cough'){
                      coughCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) coughTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='difficultyBreathing'){
                      difficultyBreathingCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) difficultyBreathingTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='headache'){
                      headacheCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) headacheTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='tiredness'){
                      tirednessCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) tirednessTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='lossOfSpeechOrMovement'){
                      lossOfSpeechOrMovementCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) lossOfSpeechOrMovementTrueCount+=1;
                  }
                  if(userCovidProcessConstants[key]==='lossSenseOfTasteOrSmell'){
                      lossSenseOfTasteOrSmellCount+=1;
                      if(person[ userCovidProcessConstants[key] ]===true) lossSenseOfTasteOrSmellTrueCount+=1;
                  }
              }

          }
      });
        setChestPain(chestPainTrueCount*100/chestPainCount);
        setCough(coughTrueCount*100/coughCount);
        setDifficultyBreathing(difficultyBreathingTrueCount*100/difficultyBreathingCount);
        setHeadache(headacheTrueCount*100/headacheCount);
        setTiredness(tirednessTrueCount*100/tirednessCount);
        setLossOfSpeechOrMovement(lossOfSpeechOrMovementTrueCount*100/lossOfSpeechOrMovementCount);
        setLossSenseOfTasteOrSmell(lossSenseOfTasteOrSmellTrueCount*100/lossSenseOfTasteOrSmellCount);
    }


    const renderProcess = async () => {
        const users = await dashboardService
            .getUsers()
            .then(async (response) => {

                let sinovacUsers = [];
                response.map( (user) =>{

                    if( user.stDoseOfVaccine1 === SINOVAC
                        || user.stDoseOfVaccine2 === SINOVAC
                        || user.stDoseOfVaccine3 === SINOVAC
                        || user.stDoseOfVaccine4 === SINOVAC  ) sinovacUsers.push(user.id);
                })
                let sinovacUsersWithCovidProcessInfoX = []
                await covidProcessService.getUsersProcess().then( (res) =>{
                    res.map( (user) =>{
                        sinovacUsers.map( x => {
                            if( x===user.userId ) sinovacUsersWithCovidProcessInfoX.push(user);
                        } )

                    })
                    console.log("covidProcessService",sinovacUsersWithCovidProcessInfoX);
                    setSinovacUsersWithCovidProcessInfo(sinovacUsersWithCovidProcessInfoX);
                } );
                console.log("respose", response);
                return response;
            });

    };

    return (
        <Layout>
            <div className='container'>
                <div className="container container-margin">

                    <div className="second-container marginTop30">
                        <div className="title">
                            <h4>Sinovac</h4>
                            <p>Processes in individuals who are vaccinated with Sinovac and do not have a chronic disease.</p>
                        </div>
                        <div className="row " >
                            <div className="col-12">
                                <div className="card removeBoxShadow" >
                                    <div className="card-body col-md-12" >


                                        <table className="table text-nowrap marginTop30" >
                                            <thead className="thead">
                                            <tr >
                                                <th className='fontWeight200'>Chest Pain</th>
                                                <th className='fontWeight200'>Cough</th>
                                                <th className='fontWeight200'>Head Ache</th>
                                                <th className='fontWeight200'>Tiredness</th>
                                            </tr>
                                            </thead>
                                            <tbody >
                                                <tr className='fontWeight700 iNegatif'>
                                                    <td>{'%'+chestPain?.toFixed(2)}</td>
                                                    <td>{'%'+cough?.toFixed(2)}</td>
                                                    <td>{'%'+headache?.toFixed(2)}</td>
                                                    <td>{'%'+tiredness?.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table className="table text-nowrap marginTop60" >
                                            <thead className="thead">
                                            <tr >
                                                <th className='fontWeight200'>Difficulty Breathing</th>
                                                <th className='fontWeight200'>Loss Of Speech Or Movement</th>
                                                <th className='fontWeight200'>Loss Sense Of Taste Or Smell</th>
                                            </tr>
                                            </thead>
                                            <tbody >
                                            <tr className='fontWeight700 iNegatif'>
                                                <td>{'%'+difficultyBreathing?.toFixed(2)}</td>
                                                <td>{'%'+lossOfSpeechOrMovement?.toFixed(2)}</td>
                                                <td>{'%'+lossSenseOfTasteOrSmell?.toFixed(2)}</td>
                                            </tr>
                                            </tbody>
                                        </table>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </Layout>
    )
}

export default Index;
