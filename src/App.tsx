import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import {notification}  from "./components/shared/notification/NotificationManager";
import notificationTypes from "./components/shared/notification/NotificationTypes";
import { conformation } from "./components/shared/confirmation/ConfirmationManager";

const deleteHandler =  async () => {
  const p =  conformation.confirm({
    title: "Confirmation title",
    content: "Conformation body",
  });

  if(await p){
    console.log("Accepted");
  } else{
    console.log("Rejected");
  }

};

class AppComponent extends Component {

  

  render(): JSX.Element {
    return (
      <BrowserRouter>

        <div className="d-grid gap-3">
          <div className="p-5 "></div>
          <div className="p-5 "></div>
          <div className="p-5 "></div>
        </div>
        <div className="mt-5 d-flex align-items-center justify-content-center">
          <button onClick={() =>
                  notification.show ({
                  title: "Toast title",
                  content: "Toast body",
                  duration: 3000,
                  type: notificationTypes.SUCCESS
                })
            } className="btn btn-primary me-2" type="submit">
                  Notification
          </button>


          <button className="btn btn-primary" type="submit"
            onClick={deleteHandler}
          >
            Show confirmation
          </button>
        
        </div>
      </BrowserRouter>
    );
  }
}

export { AppComponent };
