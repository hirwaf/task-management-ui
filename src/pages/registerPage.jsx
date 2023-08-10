import '../App.css';
import BasicLayout from "../layouts/BasicLayout";
import Routers from "../routers";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import Joi from "joi-browser";
import {ErrorSpan} from "../components/ErrorSpan";
import {useDispatch, useSelector,} from "react-redux";
import {registerAction} from "../redux/actions/user";
import {LoadingSpinner} from "../components/LoadingSpinner";

const userSchema = {
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email({tlds: {allow: false}}).required(),
    password: Joi.string().regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
        .required()
        .label('Password')
        .error(errors => {
            return {
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit or special character.',
            };
        }),
}
const RegisterPage = (props) => {
    const {user: registeredUser, loading} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (registeredUser) {
            window.location = Routers.LoginPage.path + "?registered=1";
        }
    }, [registeredUser]);
    const validateForm = (event) => {
        event.preventDefault();
        const result = Joi.validate(user, userSchema, {abortEarly: false});
        const {error} = result;
        console.log(result);
        if (!error) {
            dispatch(registerAction(user));
        } else {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                errorData[name] = item.message;
            }
            setErrors(errorData);
            return errorData;
        }
    }

    const validateProperty = (event) => {
        const {name, value} = event.target;
        const obj = {[name]: value};
        const subSchema = {[name]: userSchema[name]};
        const result = Joi.validate(obj, subSchema);
        const {error} = result;
        return error ? error.details[0].message : null;
    };

    const handleSave = (event) => {
        const {name, value} = event.target;
        let errorData = {...errors};
        const errorMessage = validateProperty(event);
        if (errorMessage) {
            errorData[name] = errorMessage;
        } else {
            delete errorData[name];
        }
        let userData = {...user};
        userData[name] = value;
        setUser(userData);
        setErrors(errorData);
    };
    const clearState = () => {
        setUser({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };


    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Registration - Task Management</title>
            </Helmet>
            <BasicLayout>
                <section className="bg-gray-50">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create and account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="names"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your name
                                        </label>
                                        <input type="text" name="name" id="names"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               value={user.name}
                                               onChange={handleSave}
                                               placeholder="Kalisa John" required=""/>
                                        <ErrorSpan message={errors.name}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input type="email" name="email" id="email"
                                               value={user.email}
                                               onChange={handleSave}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="name@company.com" required=""/>
                                        <ErrorSpan message={errors.email}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               value={user.password}
                                               onChange={handleSave}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""/>
                                        <ErrorSpan message={errors.password}/>
                                    </div>
                                    <button type="button"
                                            onClick={validateForm}
                                            disabled={loading === true}
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Create an account {loading === true && (<LoadingSpinner/>)}
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href={Routers.LoginPage.path}
                                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </BasicLayout>
        </>
    );
}
export default RegisterPage;