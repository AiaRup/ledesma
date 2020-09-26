import React from 'react';
import { useFormikContext } from 'formik';

import { AppDatePicker } from '../AppDatePicker';
import { ErrorMessage } from './ErrorMessage';

export const FormDatePicker = ({
  name,
  width,
  icon,
  placeholder,
  disabled,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppDatePicker
        date={values[name]}
        name={name}
        onSelectItem={(d) => {
          setFieldValue(name, d);
        }}
        placeholder={placeholder}
        width={width}
        icon={icon}
        disabled={disabled}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};
