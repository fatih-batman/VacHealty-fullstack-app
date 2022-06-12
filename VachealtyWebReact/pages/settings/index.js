import Layout from "../../components/layout";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import {venuesService} from "../../firebase/services/venues.service";
import {auth, storage} from "../../firebase/config";
import {Uploader} from "rsuite";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {BiPlus} from "react-icons/bi";
import CancelButton from "../../assets/svg/cancel-button.svg";


const Settings = () => {
    const user = useSelector(state => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [venue, setVenue] = useState();
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState(null);
    const imageUrl = useMemo(() => venue?.imageUrl, [venue]);

    useEffect(() => {
        setPreview(null);
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(files[0]);
        }
    }, [files]);

    useEffect(() => {
        const handle = async () => {
            const foundVenue = await venuesService.getVenueById(user.venues[0].venueID);
            setVenue(foundVenue);
            setIsLoading(false);
        }
        handle();
    }, [user]);

    const initialValues = useMemo(() => {
        console.log({venue});
        return {
            venueName: venue?.venueName ?? '',
            password: '',
            passwordConfirmation: '',
        };
    }, [venue]);

    const validator = Yup.object({
        venueName: Yup.string().required(),
        password: Yup.string(),
        passwordConfirmation: Yup.string(),
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
        backgroundColor: 'red',
        border: "1px dashed #c7c4c4",
        //width: "500px",
        width: "100%",
        height: "300px",
        cursor: "pointer",

    }
    const drop_zone_with_image = useMemo(() => ({
        opacity: "0",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        width: "100%",
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
    }), [imageUrl]);

    const handleSubmit = useCallback((values) => {
        const {venueName, password, passwordConfirmation} = values;

        console.log({values});

        const handleVenueNameChange = async () => {
            return await venuesService.updateVenueName(venue.vID, venueName);
        }

        const handlePassword = async () => {
            if (password && password.length > 0 && password === passwordConfirmation) {
                return await auth.currentUser.updatePassword(password);
            }

            return false;
        }

        const handleFiles = async () => {
            if (files.length > 0) {
                const imagePath = ref(storage, `venues/${venue.vID}`);
                const uploaded = await uploadBytes(imagePath, files[0]);
                return getDownloadURL(uploaded.ref);
            }
            return false;
        };

        setIsLoading(true);

        Promise.all([handleVenueNameChange(), handlePassword(), handleFiles()]).then((results) => {
            const [venueResult, passwordResult, uploadResult] = results;
            setVenue(venueResult);
            if (passwordResult) {
                // TODO: Password changed
            }

            if (uploadResult) {
                console.log({uploadResult});
                venuesService.updateVenueLogo(venue.vID, uploadResult).then(venue => {
                    setVenue(venue);
                }).finally(() => setIsLoading(false));
            } else {
                setIsLoading(false);
            }

            // TODO: Success
        }).catch(err => {
            console.log({err});
            setIsLoading(false);
            // TODO: Err
        });
    }, [venue, files]);

    return (
        <Layout>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary removeBoxShadow">
                                {isLoading && (
                                    <div>
                                        Loading...
                                    </div>
                                )}
                                {!isLoading && (
                                    <Formik initialValues={initialValues} validationSchema={validator}
                                            onSubmit={handleSubmit}>
                                        <Form autoComplete="off">
                                            <div className="card-body col-md-6">


                                                <div className="form-group">
                                                    <div className="file-card">
                                                        <div className="file-inputs">
                                                            <input
                                                                id="image"
                                                                accept="image/*"
                                                                type="file"
                                                                className="image-field"
                                                                multiple={false}
                                                                onChange={e => setFiles(e.target.files)}
                                                                style={preview ? drop_zone_with_image : drop_zone}
                                                            />
                                                            {
                                                                !preview && !imageUrl ?
                                                                    <label id="label" htmlFor="image">
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <BiPlus className="mx-auto"/>
                                                                                <br/>
                                                                            </div>
                                                                            <div
                                                                                className="row justify-content-center"> Drag
                                                                                an image or click to add image
                                                                            </div>
                                                                        </div>

                                                                    </label>
                                                                    :
                                                                    <div>
                                                                        <label id="label-top-right" className=""
                                                                               htmlFor="image"
                                                                               style={{
                                                                                   backgroundImage: `url(${preview ?? imageUrl})`,
                                                                                   backgroundSize: 'contain',
                                                                                   backgroundRepeat: 'no-repeat',
                                                                                   backgroundPosition: 'center center',
                                                                               }}>

                                                                        </label>
                                                                            <img className="remove-image"
                                                                                 src="/assets/cancel-button.svg"
                                                                                 onClick={() => setFiles([])}/>

                                                                    </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-group row">
                                                    <label htmlFor="venueName"
                                                           className="col-sm-3 col-form-label">Venue name</label>
                                                    <div className="col-sm-9">
                                                        <Field name="venueName" type="text" className="form-control"
                                                               autoComplete="off"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="password"
                                                           className="col-sm-3 col-form-label">Password</label>
                                                    <div className="col-sm-9">
                                                        <input type="password" className="form-control" id="password"
                                                               autoComplete="off"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="repeatPassword"
                                                           className="col-sm-3 col-form-label">Repeat Password</label>
                                                    <div className="col-sm-9">
                                                        <input type="password" className="form-control"
                                                               id="repeatPassword"/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <button type="submit" className="button">Save Changes</button>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Settings;
