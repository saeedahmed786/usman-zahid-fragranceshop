import { message } from "antd";

export const SuccessAlert = (messages) => {
    // const [messageApi, contextHolder] = message.useMessage();

    // message.success(messages);
    message.success({
        className: "ant-message",
        content: messages,
        duration: 1,
        style: { marginTop: '100px' }
    });
}
export const ErrorAlert = (messages) => {
    message.error({
        className: "ant-message",
        content: messages,
        duration: 1,
        style: { marginTop: '100px' }
    });

}
export const WarningAlert = (messages) => {
    message.warning({
        className: "ant-message",
        content: messages,
        duration: 1
    });
}
