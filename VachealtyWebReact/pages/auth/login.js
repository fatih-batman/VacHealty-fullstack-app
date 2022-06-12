import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { getAuth ,signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import icon from "../../public/assets/image/logo.png";
import Logo from '../../assets/image/logo.png';
import { userService } from "../../firebase/services/user.service";

const Login = () => {
  const router = useRouter();
  const { email } = router.query;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, [email]);

  const validator = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  useEffect(() => {
    if (isLoggedIn) {
    router.push("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
      const auth = getAuth();
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          //console.log(user);
          // ...
        }).catch(() => {
          alert("User cannot found.");
            })
        ;

        // await handleUser(userInfo.user, dispatch).then((userInfo) => {
        //   console.log(userInfo.user);
        // });
        await console.log(userInfo.user);
        
      } catch (e) {
        // TODO: Alert user

      } finally {
        resetForm();
      }



  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto mt-5 pt-5">
            <div className="vacHealty">
              {/*<Image src={icon}/>*/}
              <img src={Logo.src} className='w-50' alt="vaccine"/>
              <div className="vacHealty-text">Covid Statistics</div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validator}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    className="form-control input ng-dirty ng-valid ng-touched"
                    // formControlName="email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                  />
                  {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}
                  <div />
                  <div />
                </div>

                <div className="form-group my-2">
                  <label htmlFor="password">Password</label>
                  <Field
                    className="form-control input"
                    // formControlName="password"
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <Link href="/auth/send-reset">
                  <a>Forgot my password</a>
                </Link>

                <div className="forgot-password">
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="loginButton">
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
