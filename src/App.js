import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { generateSchema, defaultField } from "./utils/helper";
import FieldEditor from "./components/FieldEditor";

const { Title } = Typography;

const App = () => {
  const [fields, setFields] = useState([]);

  const updateField = (index, newField) => {
    const updatedFields = [...fields];
    updatedFields[index] = newField;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, defaultField()]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const schema = generateSchema(fields);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>JSON Schema Builder</Title>
      <Row gutter={16}>
        <Col span={12}>
          {fields.map((field, index) => (
            <FieldEditor
              key={index}
              field={field}
              onChange={(updated) => updateField(index, updated)}
              onDelete={() => removeField(index)}
            />
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addField}
            style={{ marginTop: 16 }}
            block
          >
            Add Field
          </Button>
        </Col>

        <Col span={12}>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: 10,
              borderRadius: 5,
              maxHeight: 500,
              overflow: "auto",
              marginTop: "10px",
            }}
          >
            {JSON.stringify(schema, null, 2)}
          </pre>
        </Col>
      </Row>
    </div>
  );
};

export default App;
