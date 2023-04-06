import { Form, Input, Modal, Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import React, { useState } from "react";

interface NewGuideCategoryModalProps {
  visible: boolean;
  onCancel: () => void;
}

const NewGuideCategoryModal: React.FC<NewGuideCategoryModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleUploadChange = (info: any) => {
    let fileList = [...info.fileList];

    // Limit the number of files to 1
    fileList = fileList.slice(-1);

    // Only accept image files
    fileList = fileList.filter((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif"
      ) {
        message.error("You can only upload JPG, PNG or GIF files!");
        return false;
      }
      return true;
    });

    setFileList(fileList);
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    onCancel();
  };

  const onFinish = async (values: any) => {
    try {
      const { name, description, tag } = values;
      const guideCategory = await fetch("/guide-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          tag,
        }),
      }).then((response) => response.json());

      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("image", fileList[0]);
        formData.append("categoryId", guideCategory.id);

        await fetch("/guide-images", {
          method: "POST",
          body: formData,
        }).then((response) => response.json());
      }

      handleCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Create New Guide Category"
      visible={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter the name of the guide category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter a description for the guide category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tag"
          label="Tag"
          rules={[
            {
              required: true,
              message: "Please enter a tag for the guide category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            {fileList.length === 0 && "+ Upload"}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewGuideCategoryModal;
