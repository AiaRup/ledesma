import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';

import { AppButton } from '../components';
import routes from '../navigation/routes';
import colors from '../config/colors';

export const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={15}
      style={styles.background}
      source={require('../assets/background.jpg')}
      resizeMode='cover'
    >
      <View style={styles.logoContainer}>
        <Text style={styles.tagline}>Ledesma</Text>
        <Image
          style={styles.logo}
          source={require('../assets/logo-blue.png')}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title='Iniciar sesión'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Registrar'
          color='secondary'
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
    marginBottom: 50
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
    color: colors.primary,
  },
});
