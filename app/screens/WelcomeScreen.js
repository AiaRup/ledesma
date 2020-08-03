import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';

import { AppButton } from '../components';
import routes from '../navigation/routes';
import colors from '../config/colors';

export const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logo-blue.png')}
        />
        <Text style={styles.tagline}>Ledesma</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title='Login'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Register'
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
