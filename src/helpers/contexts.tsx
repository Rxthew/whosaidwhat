import { ReactNode, createContext, useReducer } from "react";
import { notificationReducer } from "./services";
import { NotificationActionInterface, NotificationReducerInterface } from './types';
import { produceDefaultNotificationStatus } from "./utils";

export const NotificationsContext = createContext<null | NotificationReducerInterface>(null);
export const NotificationsDispatchContext = createContext<null | React.Dispatch<NotificationActionInterface>>(null);

export const NotificationsContextProvider = function(children:ReactNode){
        
    const defaultNotificationStatus = produceDefaultNotificationStatus(); 
    const [notifications, dispatch] = useReducer(notificationReducer, defaultNotificationStatus)
    return (
        <NotificationsContext.Provider value={notifications}>
            <NotificationsDispatchContext.Provider value={dispatch}>
                {children}
            </NotificationsDispatchContext.Provider>
        </NotificationsContext.Provider> 
    )
     
};
