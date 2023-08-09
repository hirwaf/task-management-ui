import '../App.css';
import Navbar from "../components/Navbar";
const AuthLayout = ({children}) => {
    return (
        <div className="App container mx-auto bg-gray-50 max-h-full">
            <Navbar />
            <div>{children}</div>
        </div>
    );
};
export default AuthLayout;