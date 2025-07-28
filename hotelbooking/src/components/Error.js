import React from "react";

function Error(props) {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
               {props.message} {/* Access the 'message' property from the props object */}
            </div>
        </div>
    );
}

export default Error;
