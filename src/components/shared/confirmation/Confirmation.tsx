import React from "react";


export interface ConfirmationProps {
    title?: string;
    content: string;
    reject: () => void;
    accept: () => void;
  }


  const Confirmation: React.FC<ConfirmationProps> = (props) => {
    const { reject, accept, content, title,} = props;

  return (
    <div data-testid="notification" className="notification" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="ConfirmDialog">
          <strong>{title}</strong>
          <strong>{content}</strong>
          <div>
            <button onClick={accept}>Yes</button>
            <button onClick={reject}>Cancel</button>
          </div>
        
      </div>
    </div>
  );
};


export default Confirmation;


