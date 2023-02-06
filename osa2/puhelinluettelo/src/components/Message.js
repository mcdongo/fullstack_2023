const Message = (props) => {
    if (props.message === null) {
        return null
    }

    return (
        <div className={props.type}>
            {props.message}
        </div>
    )
}

export default Message