//kullanıcının e postasını alıp firebase e geri döneceği adresi bildirmek

import {auth} from "../../firebase/config";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {sendPasswordResetEmail} from 'firebase/auth';

const SendReset = () => {
    const initialValues = {
        email: "",
    };

    const validator = Yup.object({
        email: Yup.string().email().required(),
    });

    const actionCodeSettings = (email) => ({
        url: `http://localhost:3000/auth/login?email=${email}`,
    });

    const handleSubmit = async (values) => {
        const {email} = values;
        sendPasswordResetEmail(auth, email, actionCodeSettings(email))
            .then(() => console.log('', 'Your password reset mail has been sent'))
            .catch(error => console.log('Error', error.message));
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validator} onSubmit={handleSubmit}>
            <Form>
                <Field name="email" type="text"/>
                <button type="submit">Send Password Reset Email</button>
            </Form>
        </Formik>
    )
}

export default SendReset;
