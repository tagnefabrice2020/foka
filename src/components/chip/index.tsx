import React from "react";

type Props = {
    label: string;
    onDelete: () => void
};

const Chip = ({ label, onDelete }: Props) => {
  return (
    <div className="mui-chip">
      <span className="mui-chip-label">{label}</span>
      <button className="mui-chip-delete" type="button">
        <i className="bi bi-x" onClick={onDelete}></i>
      </button>
    </div>
  );
};

export default Chip;
