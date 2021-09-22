import React from "react";

const Notification = ({ message }) => {
    if(!message){
        return null;
    }

    const messageStyle = {
        border: "5px solid",
        borderColor: message.color,
        padding: "10px",
        display: "inline-block",
        marginBottom: "10px",
        minWidth: "200px",
        fontSize: "18px",
        fontWeight: "700",
        backgroundColor: "lightgray"
    }

    return <div style={messageStyle}>{message.content}</div>
}

export default Notification;