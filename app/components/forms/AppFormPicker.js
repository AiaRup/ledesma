import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import { AppPicker } from '../AppPicker';
import { ErrorMessage } from './ErrorMessage';

export const AppFormPicker = ({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  icon,
  dependedField,
  dependedFunc
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [dependedValue, setDependedValue] = useState(null);


  useEffect(() => {
    if (dependedField) {
      setDependedValue(values && values[dependedField] && values[dependedField]._id)
      console.log('values', values);
      console.log('dependedField', dependedField);
      console.log('dependedValue', dependedValue);
      console.log('items', items);
    }
  }, [dependedField, values[dependedField]])

  return (
    <>
      <AppPicker
        items={dependedField ? dependedFunc(dependedValue) : items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        icon={icon}
        dependedField={dependedField}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};
