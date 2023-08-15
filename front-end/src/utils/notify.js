import React from "react";
import { notification } from "antd";
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  StopFilled,
} from "@ant-design/icons";
const duration = 2; // (seconds)

// const [api, contextHolder] = notification.useNotification();

const openSuccessNotification = (description) => {
  notification.success({
    message: "Success",
    description,
    duration, // (seconds)
    className: "notification",
    style: {
      width: 600,
      minWidth: 320,
      maxWidth: 368,
      backgroundColor: "#F6FFED",
      border: "1px solid #B7EB8F",
      margin: 0,
      boxShadow: "unset"
    },
    icon: <CheckCircleFilled style={{ color: "#52C51A" }} />
    // icon: <CheckCircleFilled className="success-icon" />,
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
    className: "notification",
    style: {
      width: 600,
      minWidth: 320,
      maxWidth: 368,
      backgroundColor: "#fffbe6",
      border: "1px solid #ffe58f",
      margin: 0,
      boxShadow: "unset"
    },
    icon: <ExclamationCircleFilled style={{ color: "#f9bf02" }} />
    // icon: <ExclamationCircleFilled className="warning-icon" />,
  });
};

const openErrorNotification = (description) => {
  notification.error({
    message: "Error",
    description,
    duration,
    className: "notification",
    style: {
      width: 600,
      minWidth: 320,
      maxWidth: 368,
      backgroundColor: "#fff1f0",
      border: "1px solid #ffa39e",
      margin: 0,
      boxShadow: "unset"
    },
    icon: <StopFilled style={{ color: "#f5222e" }} />
    // icon: <StopFilled className="error-icon" />,
  });
};

export const notificationController = {
  success: openSuccessNotification,
  info: openInfoNotification,
  warning: openWarningNotification,
  error: openErrorNotification,
};