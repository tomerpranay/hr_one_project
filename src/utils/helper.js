export const generateSchema = (fields) => {
  const schema = {};
  fields.forEach((field) => {
    if (!field.key) return;
    if (field.type === "nested") {
      schema[field.key] = generateSchema(field.children);
    } else {
      schema[field.key] = field.type;
    }
  });
  return schema;
};

export const defaultField = () => ({
  key: "",
  type: "string",
  children: [],
});
