import React from 'react';
import { useFormikContext } from 'formik';

import { AppDatePicker } from '../AppDatePicker';
import { ErrorMessage } from './ErrorMessage';

export const FormDatePicker = ({
  name,
  numberOfColumns = 1,
  width,
  icon,
  disabled,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppDatePicker
        date={values[name]}
        numberOfColumns={numberOfColumns}
        onSelectItem={(d) => {
          setFieldValue(name, d);
          onChange && onChange(d);
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
