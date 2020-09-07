import React, { useState } from 'react';
import { useFormikContext } from 'formik';

import { AppTextInput } from './AppTextInput';
import { ErrorMessage } from './ErrorMessage';

export const AppFormField = ({ name, width, validate, ...rest }) => {
  const [customError, setCustomError] = useState(null)
  const {
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
    values
    } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text)
          if(validate) {
            const error = validate(text)
            error ? setCustomError(error) : setCustomError(null)
          }
        }}
        value={values[name]}
        width={width}
        {...rest}
      />
      <ErrorMessage error={customError || errors[name]} visible={touched[name]} />
    </>
  );
};
