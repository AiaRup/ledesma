import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { Notifications } from 'expo';
import * as Yup from 'yup';

import { AppForm } from './forms/AppForm';
import { AppFormField } from './forms/AppFormField';
import { SubmitButton } from './forms/SubmitButton';
import messagesApi from '../api/messages';
import logger from '../utility/logger';

export const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      logger.log('Error', result);
      return Alert.alert('Error', 'Could not send the message to the seller.');
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'Your message was sent to the seller.',
    });
  };

  return (
    <AppForm
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  );
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});
