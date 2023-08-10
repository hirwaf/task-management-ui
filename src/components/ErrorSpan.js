export const ErrorSpan = ({message = ''}) => {
    if (message !== '') {
        return (
            <span
                className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
    {message}
            </span>
        )
    }
    return (<></>);
}