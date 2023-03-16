const MyButton = ({text,  type, onClick}) => {
    
    const bynType = ['positive', 'negative'].includes(type)? type:'default';
    
    return (
        <button className= {["MyButton", `MyButton_${bynType}`].join(" ")} 
        onClick={onClick}>
            {text}
        </button>
    )
}

MyButton.defaultProps = {
    type : "default",
}

export default MyButton;