import React from "react";
import { Form } from "react-bootstrap";
import initialBg from "../initialBg";

function FormSelect({ handleChangeBackground, handleSetDefaultBackground }) {
  return (
    <div className="changeBg">
      <Form.Select
        aria-label="Default select example"
        onChange={handleChangeBackground}
      >
        <option onClick={handleSetDefaultBackground}>Select background</option>
        {initialBg.map((bg) => (
          <option key={bg.id} value={bg.url}>
            {bg.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default FormSelect;
