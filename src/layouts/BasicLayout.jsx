import '../App.css';

const BasicLayout = ({children}) => {
    return (
        <div className="App container mx-auto bg-gray-50 max-h-full">
            {children}
        </div>
    );
};
export default BasicLayout;