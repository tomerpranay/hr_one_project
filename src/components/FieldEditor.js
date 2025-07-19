import React from "react";
import { Input, Button, Select, Space, Card } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { defaultField } from "../utils/helper";

const { Option } = Select;

const FieldEditor = ({ field, onChange, onDelete }) => {
  const update = (updates) => {
    onChange({ ...field, ...updates });
  };

  const updateChild = (index, updatedChild) => {
    const newChildren = [...field.children];
    newChildren[index] = updatedChild;
    update({ children: newChildren });
  };

  const addChild = () => {
    update({ children: [...(field.children || []), defaultField()] });
  };

  const removeChild = (index) => {
    const newChildren = field.children.filter((_, i) => i !== index);
    update({ children: newChildren });
  };

  return (
    <Card size="small" style={{ marginTop: 10 }}>
      <Space style={{ width: "100%" }} wrap align="start">
        <Input
          placeholder="Key"
          value={field.key}
          onChange={(e) => update({ key: e.target.value })}
          style={{ width: 200 }}
        />
        <Select
          value={field.type}
          onChange={(value) =>
            update({
              type: value,
              children: value === "nested" ? field.children || [] : [],
            })
          }
          style={{ width: 150 }}
        >
          <Option value="string">String</Option>
          <Option value="number">Number</Option>
          <Option value="nested">Nested</Option>
        </Select>
        <Button icon={<MinusCircleOutlined />} danger onClick={onDelete}>
          Delete
        </Button>
      </Space>

      {field.type === "nested" && (
        <div
          style={{
            marginLeft: 20,
            marginTop: 10,
            borderLeft: "5px",
            borderColor: "grey",
          }}
        >
          {field.children.map((child, idx) => (
            <FieldEditor
              key={idx}
              field={child}
              onChange={(updated) => updateChild(idx, updated)}
              onDelete={() => removeChild(idx)}
            />
          ))}
          <Button
            icon={<PlusOutlined />}
            onClick={addChild}
            type="dashed"
            style={{ marginTop: 8 }}
          >
            Add Nested Field
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FieldEditor;
