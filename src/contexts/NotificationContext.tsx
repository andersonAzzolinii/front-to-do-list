import React, { createContext, useContext, useState } from "react";
import Notification from "../screens/components/Notification/Notification";

type NotificationType = "success" | "error" | "warning";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  duration: number;
}

interface NotificationContextProps {
  notify: (
    type: NotificationType,
    message: string,
    duration?: number
  ) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (
    type: NotificationType,
    message: string,
    duration: number = 2000
  ) => {
    const id = Math.random();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ notify, notifications }}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
