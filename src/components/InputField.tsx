import React, {FC} from 'react';

type InputFieldProps = {
  inputValue: string,
  setInputValue: Function,
}

const InputField: FC<InputFieldProps> = ({ inputValue, setInputValue }: InputFieldProps) => {

  return (
    <textarea
      className="input-field"
      value={inputValue}
      onChange={(e) => { setInputValue(e.target.value) }}
    >
    </textarea>
  );
}

export default InputField;
