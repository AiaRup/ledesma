import React from 'react';
import { useFormikContext } from 'formik';
const dayjs = require('dayjs');

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
          const date = dayjs(d).format('DD/MM/YYYY');
          setFieldValue(name, date);
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
