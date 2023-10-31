import React, { useEffect } from "react";

interface OwnProps {
  option: string;
  optionHandler: React.ChangeEventHandler<HTMLInputElement>;
}
interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="mr-4 text-xl">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
    </div>
  );
};

const TypeOfSales: React.FC<OwnProps> = ({ option, optionHandler }) => {
  const radioOptions = [
    { id: "bid", value: "경매", label: "경매" },
    { id: "reversebid", value: "역경매", label: "역경매" },
    { id: "discount", value: "할인", label: "할인" },
  ];

  return (
    <div className="flex">
      {radioOptions.map(opt => (
        <RadioButton
          key={opt.id}
          id={opt.id}
          name="drone"
          value={opt.value}
          checked={option === opt.value}
          onChange={optionHandler}
          label={opt.label}
        />
      ))}
    </div>
  );
};

export default TypeOfSales;
