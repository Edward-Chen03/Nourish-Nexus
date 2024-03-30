import "./ContentWrapper.css"

export default function ContentWrapper ({ children }) {
    return (
        <>
        <span className="contentContainer">
            {children}    
        </span>
        </>
    )
};