import React, { useState } from "react";
import { Button, Input, Form, Popover, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddBoostingPopover = ({ onAddBoosting }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
    form.resetFields();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onAddBoosting(values);
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const popoverContent = (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Category">
          <Option value="dungeons">Dungeons</Option>
          <Option value="raids">Raids</Option>
          <Option value="arena">Arena</Option>
          <Option value="battlegrounds">Battlegrounds</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Please enter a price" },
          { type: "number", message: "Please enter a valid price" },
        ]}
      >
        <Input type="number" placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item
        name="image"
        rules={[{ required: true, message: "Please upload an image" }]}
        valuePropName="fileList"
        getValueFromEvent={(event) =>
          event.fileList.length > 0 ? [event.fileList[0].originFileObj] : []
        }
      >
        <Upload
          name="image"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="nickname"
        rules={[{ required: true, message: "Please enter a nickname" }]}
      >
        <Input placeholder="Nickname" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Boosting
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Popover
      content={popoverContent}
      title="Add Boosting"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button type="primary">Add Boosting</Button>
    </Popover>
  );
};

export default AddBoostingPopover;
