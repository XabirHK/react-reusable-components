import React from "react";
import ReactDOM from "react-dom";
import Notification, { NotificationProps } from "./Notification";
import notificationTypes from "./NotificationTypes";

interface NotificationOptions {
  type: notificationTypes;
  id?: string;
  title?: string;
  content: string;
  duration?: number;
}

export class NotificationManager {
  private containerRef: HTMLDivElement;
  private notifications: NotificationProps[] = [];

  constructor() {
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const notificationContainer = document.createElement("div") as HTMLDivElement;
    notificationContainer.id = "notification-container-main";
    body.insertAdjacentElement("beforeend", notificationContainer);
    this.containerRef = notificationContainer;
  }

  public show(options: NotificationOptions): void {
    const notificationId = Math.random().toString(36).substr(2, 9);
    const notification: NotificationProps = {
      id: notificationId,
      ...options,
      destroy: () => this.destroy(options.id ?? notificationId),
    };

    this.notifications = [notification, ...this.notifications];
    this.render();
  }

  public destroy(id: string): void {
    this.notifications = this.notifications.filter((notification: NotificationProps) => notification.id !== id);
    this.render();
  }

  private render(): void {
    const notificationsList = this.notifications.map((notificationProps: NotificationProps) => (
      <Notification key={notificationProps.id} {...notificationProps} />
    ));
    ReactDOM.render(notificationsList, this.containerRef);
  }
}

export const notification = new NotificationManager();
