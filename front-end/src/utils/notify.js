import React from "react";
import { notification } from "antd";
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  StopFilled,
} from "@ant-design/icons";
const duration = 2; // (seconds)

const openSuccessNotification = (description) => {
  notification.success({
    message: "Success",
    description,
    duration, // (seconds)
    icon: <CheckCircleFilled className="success-icon" />,
  });
};

const openInfoNotification = (description) => {
  notification.info({
    message: "Infor",
    description,
    duration, // (seconds)
    icon: <InfoCircleFilled className="info-icon" />,
  });
};

const openWarningNotification = (description) => {
  notification.warning({
    message: "Warning",
    description,
    duration,
    icon: <ExclamationCircleFilled className="warning-icon" />,
  });
};

const openErrorNotification = (description) => {
  notification.error({
    message: "Error",
    description,
    duration,
    icon: <StopFilled className="error-icon" />,
  });
};

export const notificationController = {
  success: openSuccessNotification,
  info: openInfoNotification,
  warning: openWarningNotification,
  error: openErrorNotification,
};