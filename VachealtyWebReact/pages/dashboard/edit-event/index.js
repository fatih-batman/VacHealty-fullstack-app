import {useRouter} from "next/router";
import Layout from "../../../components/layout";
import { useEffect ,useState } from "react";
import {Field, Form, Formik} from "formik";
import {BiPlus} from "react-icons/bi";
import CancelButton from "../../../assets/svg/cancel-button.svg";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {eventService} from "../../../firebase/services/event.service";


const EditEvent = () => {
    const router = useRouter();
    const [eventUpdate, setEventUpdate] = useState();
    const [formikInitialValues, setFormikInitialValues] = useState();
    const [eventUpdatedSuccessfully, setEventUpdatedSuccessfully] = useState(false);

    useEffect(() => {
        defaultInitialValues();
    }, []);


    const defaultInitialValues = () => {
        //const { data } = getQueryParams(window.location.search);
        const data =JSON.parse( JSON.parse( JSON.stringify(router.query.data) ) );
        console.log( "Router..querqwe", data );
        //console.log( "RouterQWEQWEQW", new Date(data.dateEnd.seconds).toLocaleTimeString()   );
        //console.log( "RouterQWEQWEQW", new Date(data.dateEnd.seconds).toDateString() );
        setEventUpdate( data );
        getDrinkCategoriesDrinks();

        let x = new Date(data.date?data.date.slice(0,16):null);
        x.setMinutes(x.getMinutes() - x.getTimezoneOffset() )
        x.setMinutes(x.getMinutes() - x.getTimezoneOffset() ) // ıt work true now
        x = x.toISOString().slice(0,16);
        let y = new Date(data.dateEnd?data.dateEnd.slice(0,16):null);
        y.setMinutes(y.getMinutes() - y.getTimezoneOffset() )
        y.setMinutes(y.getMinutes() - y.getTimezoneOffset() )
        y = y.toISOString().slice(0,16);
        // doorsOpen: data.date.seconds?new Date(data.date.seconds * 1000).toLocaleTimeString():"",
        let z = data.doorsOpen;
        setFormikInitialValues(
            {
                eventName: data.name?data.name:"",
                img:"",
                date: x,
                dateEnd: y,
                termsAndConditionLink: data.termsAndConditionsUrl?data.termsAndConditionsUrl:"",
                freeVoucherCount:data.freeDrinkCount?data.freeDrinkCount:"",
                freeVoucherType:data.freeDrinkId?data.freeDrinkId:"",
                doorsOpen: z,
                description: data.description?data.description:"",
            }
        );
        setImageUrl(data.image);
        setImage(data.image);
    }



    const user = useSelector((state) => state.auth.user);
    const venueID = user.venues[0] ? user.venues[0].venueID : null;
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [drinks, setDrinks] = useState();
    const [inputValue, setinputValue] = useState(undefined); //it should be here because the same image was not working the second time it was uploaded.

    const getDrinkCategoriesDrinks = async () => {
        await eventService.getDrinks(venueID).then(response => {
            setDrinks(response);
        });

    }

    const imageOnChange = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setImage(undefined);
            setImageUrl(undefined);
            return
        }
        console.log(event.target.files[0]);
        // I've kept this example simple by using the first image instead of multiple
        setImage(event.target.files[0])
        setImageUrl( URL.createObjectURL(event.target.files[0]));
    }

    const removeImage = () => {
        setImage(undefined);
        setImageUrl(undefined);
        setinputValue("");
        //imageOnChange();

    }

    const sendImageAndGetUrl = async () => {
        await eventService.sendFileToStorageEvents(image).then( (value)=>{
            setImageUrl(value)
        })

    };

    const sendEvent = async (values,venueID,process) => {
        if (process==="UPDATE"){
            console.log("update");
            await eventService.updateEvent(eventUpdate.id,values).then((e)=>{
                setEventUpdatedSuccessfully(true);
                setImageUrl(null);
                setImage(null);

            }) .catch(()=>{
                setEventUpdatedSuccessfully(false);
            })
        }
        else await eventService.createEvent(values,venueID);
    };



    const handleSubmit = (values, { resetForm }) => {
        const {
            eventName,
            img,
            date,
            dateEnd,
            termsAndConditionLink,
            freeVoucherCount,
            freeVoucherType,
            doorsOpen,
            description,
        } = values;
        if(!values.freeVoucherType && values.freeVoucherType!=="Select Drinks"){
            values.freeVoucherType="";
            values.freeVoucherCount="";
        }
        //const process = "CREATE"
        const process = "UPDATE"
        sendImageAndGetUrl().then(() => {
            values.img=imageUrl;
            console.log("values",values);
            sendEvent(values,venueID,process);
        })


    };

    const validator = Yup.object({
        description: Yup.string().required(),
    });

    const drop_zone = { //these are here because we must use this classes state
        opacity: "0",
        zIndex: "2",
        position: "relative",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        //backgroundColor: "#f6f6f6",
        backgroundColor:'red',
        border: "1px dashed #c7c4c4",
        //width: "500px",
        width:"100%",
        height: "300px",
        cursor: "pointer",

    }
    const drop_zone_with_image = {
        opacity: "0",
        backgroundImage:`url(${imageUrl})`,
        backgroundSize:'cover',
        width:"100%",
        height: "300px",
        zIndex: "1",
        position: "relative",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f6f6f6",
        border: "1px dashed #c7c4c4",
        cursor: "pointer",
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-12">





                        <div className="card card-primary removeBoxShadow">
                            <div className="card-body text-center" >
                                <h6> Edit Event</h6> <br/>

                                <Formik
                                    enableReinitialize
                                    initialValues={formikInitialValues?formikInitialValues:
                                        {
                                            eventName: "",
                                            img: "",
                                            date: "",
                                            dateEnd: "",
                                            termsAndConditionLink: "",
                                            freeVoucherCount:"",
                                            freeVoucherType:"",
                                            doorsOpen: "",
                                            description: "",
                                        }
                                    }
                                    validationSchema={validator}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="row justify-content-center">
                                        <div className="col-7">
                                            <Form >


                                                {/* image field */}
                                                <div className="form-group">
                                                    <div className="file-card">
                                                        <div className="file-inputs">
                                                            <input
                                                                id="image"
                                                                accept="image/*"
                                                                type="file"
                                                                className="image-field "
                                                                value={inputValue}
                                                                onChange={imageOnChange}
                                                                style={imageUrl?drop_zone_with_image:drop_zone}
                                                            />
                                                            {
                                                                !imageUrl ?
                                                                    <label id="label" htmlFor="image">
                                                                        {/*image?<img className="img-responsive" src={imageUrl}  />:null */}
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <BiPlus className="mx-auto"/>
                                                                                <br/>
                                                                            </div>
                                                                            <div className="row justify-content-center"> Drag an image or click to add image</div>
                                                                        </div>

                                                                    </label>
                                                                    :
                                                                    <div>
                                                                        <label id="label-top-right" className="" htmlFor="image"
                                                                               style={{backgroundImage:`url(${imageUrl})`,backgroundSize:'cover'}}>

                                                                        </label>
                                                                        {/*<Image className="remove-image" src={CancelButton} onClick={removeImage}  />*/}
                                                                        <img className="remove-image" src={CancelButton.src} onClick={removeImage}  />
                                                                    </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* /image field */}



                                                {/* event name */}
                                                <div className="form-group">
                                                    <Field
                                                        className="form-control input"
                                                        id="eventName"
                                                        name="eventName"
                                                        type="eventName"
                                                        autoComplete="username"
                                                        required
                                                        placeholder="Event Name"
                                                    />
                                                </div>
                                                {/* /event name */}





                                                <div
                                                    className="form-group"
                                                >
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <Field
                                                                className="form-control input"
                                                                id="date"
                                                                name="date"
                                                                type="datetime-local"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-6">
                                                            <Field
                                                                className="form-control input"
                                                                id="dateEnd"
                                                                name="dateEnd"
                                                                type="datetime-local"
                                                                required
                                                            />
                                                        </div>

                                                    </div>

                                                </div>





                                                <div className="form-group">
                                                    <Field
                                                        className="form-control input ng-dirty ng-valid ng-touched"
                                                        id="termsAndConditionLink"
                                                        name="termsAndConditionLink"
                                                        type="termsAndConditionLink"
                                                        required
                                                        placeholder="Paste your terms and conditions here"
                                                    />
                                                </div>

                                                {/* doors open*/}

                                                <div className="form-group">
                                                    <Field
                                                        className="form-control input"
                                                        id="doorsOpen"
                                                        name="doorsOpen"
                                                        type="time"
                                                        required
                                                    />
                                                </div>
                                                {/* /doors open */}



                                                {/* ticket price link*/}
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <Field
                                                                className="form-control input ng-dirty ng-valid ng-touched"
                                                                id="freeVoucherCount"
                                                                name="freeVoucherCount"
                                                                type="freeVoucherCount"
                                                                placeholder="Free voucher count"
                                                                required
                                                                //value="asdas"

                                                            />
                                                        </div>

                                                        <div className="col-6">
                                                            <Field
                                                                className="form-control input"
                                                                id="freeVoucherType"
                                                                name="freeVoucherType"
                                                                required
                                                                as="select"
                                                            >
                                                                <option value={undefined} id="noChecked">Select Drinks</option>
                                                                {drinks?
                                                                    drinks.map( (e) => <option defaultValue value={e.id} key={e.name}>{e.name}</option> )
                                                                    :null}
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* /ticket price link*/}


                                                {/* description*/}
                                                <div className="form-group my-2">
                                                    {/* <textarea
                          className="form-control input"
                          id="description"
                          name="description"
                          type="textarea"
                          placeholder="Description"
                          required
                      />*/}

                                                    <Field
                                                        className="form-control input"
                                                        id="description"
                                                        name="description"
                                                        as='textarea'
                                                        placeholder="Description"
                                                        required
                                                    />

                                                </div>
                                                {/* /description*/}

                                                <div className="forgot-password ">
                                                    <div className="d-flex justify-content-end">
                                                        <button type="submit" className="loginButton button">
                                                            Send
                                                        </button>
                                                    </div>
                                                </div>
                                                {eventUpdatedSuccessfully?"Event updated successfully!":null}
                                            </Form>
                                        </div>

                                    </div>




                                </Formik>
                            </div>
                        </div>




                    </div></div></div>
        </Layout>
    );
};



export default EditEvent;
