import { act, cleanup, fireEvent, getAllByTestId, getByTestId, render} from "@testing-library/react";
import React from "react";
import { notification } from "../../../../components/shared/notification/NotificationManager";
import notificationTypes from "../../../../components/shared/notification/NotificationTypes";

afterEach(cleanup);

describe("Notification  tests", () => {

    it("tests if button click show notification", () => {
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    content: "This is an error",
                    type: notificationTypes.ERROR
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});
        
        const notificationElem = getByTestId("notification");
        expect(notificationElem).toBeInTheDocument();

        const closeButton = getByTestId("close-button");
        expect(closeButton).toBeInTheDocument();

        act(() => {fireEvent.click(closeButton);});
      });


      it("tests if notification close buttom work", () => {
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    content: "This is an error",
                    type: notificationTypes.ERROR
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});

        const notificationElem = getByTestId("notification");
        const closeButton = getByTestId("close-button");
        expect(closeButton).toBeInTheDocument();

        act(() => {fireEvent.click(closeButton);});
        
        expect(notificationElem).not.toBeInTheDocument();

      });

    
    


      it("tests if title is provided then it is present in the notification", () => {
        const notificationTitle= "Network error";
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    title: notificationTitle,
                    content: "This is an error",
                    duration: 3000,
                    type: notificationTypes.ERROR
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});
        
        const notificationElem = getByTestId("notification");
        expect(notificationElem).toBeInTheDocument();
        expect(notificationElem).toHaveTextContent(notificationTitle);

        const closeButton = getByTestId("close-button");
        act(() => {fireEvent.click(closeButton);});
      });

      it("tests if title is NOT provided then it title is set acording to type WARNING", () => {
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    content: "Some mandetory text",
                    duration: 3000,
                    type: notificationTypes.WARNING
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});
        
        const notificationHeader = getByTestId("notification-header");
        expect(notificationHeader).toBeInTheDocument();
        expect(notificationHeader).toHaveTextContent("Warning");

        const closeButton = getByTestId("close-button");
        act(() => {fireEvent.click(closeButton);});
      });


      it("tests if title is NOT provided then it title is set acording to type SUCCESS", () => {
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    content: "Some mandetory text",
                    duration: 3000,
                    type: notificationTypes.SUCCESS
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});
        
        const notificationHeader = getByTestId("notification-header");
        expect(notificationHeader).toBeInTheDocument();
        expect(notificationHeader).toHaveTextContent("Success");

        const closeButton = getByTestId("close-button");
        act(() => {fireEvent.click(closeButton);});
      });


      it("tests if it closes autometically after given duration time", () => {
        const { getByTestId } = render(
        <div>
            <button data-testid="click-me"
                onClick={() =>
                notification.show({
                    content: "This is an error",
                    duration: 3000,
                    type: notificationTypes.ERROR
                    })
                }
                >
                Show notification
            </button>
        </div>);
      
        const elem = getByTestId("click-me");
        expect(elem).toHaveTextContent("Show notification");

        act(() => {fireEvent.click(elem);});
        
        const notificationElem = getByTestId("notification");
        expect(notificationElem).toBeInTheDocument();
        
        setTimeout(() => {
            expect(notificationElem).not.toBeInTheDocument();
        }, 3010);

      });

});
