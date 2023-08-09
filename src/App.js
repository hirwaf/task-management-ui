import './App.css';
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Routers from "./routers";
import isLoggedIn from "./helpers/isLoggedIn";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/registerPage";
import BrowseTaskPage from "./pages/tasks/browsePage";

const ProtectedRoute = () => {
    const isAuthenticated = isLoggedIn();

    if (!isAuthenticated) {
        return <Navigate to={Routers.LoginPage.path} replace />;
    }

    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path={Routers.LoginPage.path} element={<LoginPage/>}/>
            <Route path={Routers.RegisterPage.path} element={<RegisterPage/>}/>
            <Route path={Routers.TaskDetailPage.path} element={<ProtectedRoute />} >
                <Route index element={(<></>)} />
            </Route>
            <Route path={Routers.TasksListPage.path} element={<ProtectedRoute />} >
                <Route index element={<BrowseTaskPage />} />
            </Route>
            <Route path={Routers.TaskEditPage.path} element={<ProtectedRoute />} >
                <Route index element={(<></>)} />
            </Route>
            <Route path={Routers.TaskCreatePage.path} element={<ProtectedRoute />} >
                <Route index element={(<></>)} />
            </Route>
        </Routes>
    );
}

export default App;
