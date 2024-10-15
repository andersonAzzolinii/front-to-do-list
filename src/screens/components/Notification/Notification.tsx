// Notification.tsx
import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";

type NotificationProps = {
  message: string;
  type: "success" | "error" | "warning";
  duration?: number;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 1000,
}) => {
  const translateY = new Animated.Value(-100);
  const progressBarWidth = new Animated.Value(1); // Usado para a largura da barra de progresso

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(progressBarWidth, {
      toValue: 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const hideNotification = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, duration);

    return () => clearTimeout(hideNotification);
  }, [translateY, duration, progressBarWidth]);

  const getBackgroundColor = () => {
    console.log(type)
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <Container>
      <AnimatedNotification
        style={{
          transform: [{ translateY }],
          backgroundColor: getBackgroundColor(),
        }}
      >
        <MessageText>{message}</MessageText>
        <ProgressBar
          style={{
            width: progressBarWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </AnimatedNotification>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const AnimatedNotification = styled(Animated.View)`
  padding: 15px;
  border-bottom-width: 2px;
  border-bottom-color: white;
`;

const MessageText = styled.Text`
  color: white;
  text-align: center;
  font-size: 16px;
`;

const ProgressBar = styled(Animated.View)`
  height: 4px;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default Notification;
