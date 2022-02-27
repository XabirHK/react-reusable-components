import React, { useEffect } from "react";
import { InfoSquareFill, ExclamationTriangleFill, ExclamationOctagonFill, CheckSquareFill } from 'react-bootstrap-icons';
import notificationTypes from "./NotificationTypes";

export interface NotificationProps {
  id: string;
  destroy: () => void;
  type: notificationTypes;
  title?: string;
  content: string;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { destroy, type, content, title, duration = 0 } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);
  
  const getNotificationIcon = (type: notificationTypes) => {
    switch (type) {
      case notificationTypes.WARNING: {
        return <ExclamationTriangleFill></ExclamationTriangleFill>;
      }
      case notificationTypes.SUCCESS: {
        return <CheckSquareFill></CheckSquareFill>;
      }
      case notificationTypes.ERROR: {
        return <ExclamationOctagonFill></ExclamationOctagonFill>;
      }
      default: {
        return <InfoSquareFill></InfoSquareFill>;
      }
    }
  };


  const getdefaultTitle = (type: notificationTypes, title: string | undefined) => {
      if(title === undefined){
        switch (type) {
          case notificationTypes.WARNING: {
            return "Warning";
          }
          case notificationTypes.SUCCESS: {
            return "Success";
          }
          case notificationTypes.ERROR: {
            return "Error !";
          }
          default: {
            return "Information";
          }
        }
      }
    return title;
  };

  return (
    <div data-testid="notification" className="notification" role="alert" aria-live="assertive" aria-atomic="true">
      <div data-testid="notification-header" className={"notification-header " + type}>
        <div >
          {getNotificationIcon(type)}
          <strong className="me-auto padding-left-5">{getdefaultTitle(type, title)}</strong>
        </div>
        
        <button data-testid="close-button" type="button" onClick={destroy} className="btn-close" aria-label="Close"></button>
      </div>
      <div className="notification-body">
        {content}
      </div>
    </div>
  );
};

const shouldRerender = (prevProps: NotificationProps, nextProps: NotificationProps) => {
  return prevProps.id === nextProps.id;
};

export default React.memo(Notification, shouldRerender);

