import React, { useState } from "react";
import { Button, Form, Input, Popover } from "antd";

type Props = {
  onAddEvent: (event: any) => void;
};

const AddEventPopover = ({ onAddEvent }: Props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onAddEvent(values);
      form.resetFields();
      setVisible(false);
    });
  };

  const popoverContent = (
    <Form form={form}>
      <Form.Item name="startTime" label="Start Time">
        <Input type="datetime-local" />
      </Form.Item>
      <Form.Item name="endTime" label="End Time">
        <Input type="datetime-local" />
      </Form.Item>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Input type="file" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location">
        <Input />
      </Form.Item>
      <Form.Item
        name="hostingCharacterNickname"
        label="Hosting Character Nickname"
      >
        <Input />
      </Form.Item>
      <Button type="primary" onClick={handleSubmit}>
        Add Event
      </Button>
    </Form>
  );

  return (
    <Popover
      content={popoverContent}
      title="Add Event"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      trigger="click"
    >
      <Button type="primary">Добавить ивент</Button>
    </Popover>
  );
};

export default AddEventPopover;
