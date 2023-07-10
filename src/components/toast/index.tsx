import React from "react";
import { toast } from "react-hot-toast";

type Props = {
    message: string,
    duration?: number,
    type: "error" | "success" | "warning"
};

const ToastNotification = ({ message, duration, type }: Props) => {
    switch (type) {
        case "error":
            toast.error(message, {
                duration: duration || 2000
            });
            break;
        case "success":
             toast.success(message, {
               duration: duration || 2000,
             });
            break;
        case "warning":
            break;
    }
    
}

export default ToastNotification;
