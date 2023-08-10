import '../App.css';
import BasicLayout from "../layouts/BasicLayout";
import Routers from "../routers";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {Notify} from "../components/Notify";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {login} from "../services/user.service";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {loginAction} from "../redux/actions/user";
import {ErrorSpan} from "../components/ErrorSpan";


const LoginPage = (props) => {
    const {loading, error, token, isLogged} = useSelector(state => state.user);
    const search = useLocation().search;
    const registeredUser = new URLSearchParams(search).get("registered");
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        console.log([token, isLogged])
        if (token && isLogged) {
            window.location = Routers.TasksListPage.path;
        }
    }, [token, isLogged]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        let userData = {...user};
        userData[name] = value;
        setUser(userData);
    }

    const loginButton = (event) => {
        event.preventDefault();
        if (user.email) {
            dispatch(loginAction(user));
        }
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Login - Task Management</title>
            </Helmet>
            <BasicLayout>
                <section className="bg-gray-50 w-full">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input type="email" name="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="name@company.com"
                                               required
                                               autoFocus
                                               autoComplete="off"
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               onChange={handleChange}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required autoComplete="off"/>
                                    </div>
                                    <div>
                                        <ErrorSpan message={error ?? ""}/>
                                    </div>
                                    <button type="button"
                                            onClick={loginButton}
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Sign in {loading === true && (<LoadingSpinner/>)}
                                    </button>
                                    <div className="flex items-center justify-end">
                                        <a href={Routers.RestPassword.path}
                                           className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <a href={Routers.RegisterPage.path}
                                                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                        up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </BasicLayout>
            {registeredUser && (
                Notify('Success', 'Your account has been registered, please login')
            )}
        </>
    );
}
export default LoginPage;