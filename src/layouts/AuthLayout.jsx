import '../App.css';

const AuthLayout = ({children}) => {
    return (
        <div className="App">
            <h1 className="text-3xl font-bold underline">
                {{children}}
            </h1>
        </div>
    );
};
export default AuthLayout;