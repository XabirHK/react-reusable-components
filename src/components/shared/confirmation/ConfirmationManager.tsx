import React, {useState} from "react";
import ReactDOM from "react-dom";
import Confirmation, { ConfirmationProps } from "./Confirmation";

interface ConfirmationOptions {
  title?: string;
  content: string;
}


class ConfirmationManager {
  
  private containerRef: HTMLDivElement;
  private confirmationProps!: ConfirmationProps;

  private promise:boolean;

  constructor() {
    this.promise = false;
    const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
    const confirmationContainer = document.createElement("div") as HTMLDivElement;
    body.appendChild(confirmationContainer);
    this.containerRef = confirmationContainer;
  }


  public confirm = async (options: ConfirmationOptions): Promise<boolean> => {
    
    const confirmationProps : ConfirmationProps = {
      ...options,
      reject: () => this.reject(),
      accept: () => this.accept()
    };
    this.confirmationProps = confirmationProps;
    this.render();

    return this.promise;
  };

  // public show(options: ConfirmationOptions): void {
  //   const confirmationProps : ConfirmationProps = {
  //     ...options,
  //     reject: () => this.reject(),
  //     accept: () => this.accept()
  //   };
  //   this.confirmationProps = confirmationProps;
  //   this.render();
  // }

  private render(): void {
    ReactDOM.render(<Confirmation {...this.confirmationProps}> </Confirmation>, this.containerRef);
  }

  private accept(): void {
    console.log(true);
    ReactDOM.unmountComponentAtNode(this.containerRef);
    this.promise = true;
  }

  private reject(): void {
    console.log(false);
    ReactDOM.unmountComponentAtNode(this.containerRef);
    this.promise = false;
  }
}

export const conformation = new ConfirmationManager();