import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { ListItem, Screen, Icon, ListItemSeperator } from '../components';
import { UploadScreen } from './UploadScreen';
import colors from '../config/colors';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';
import listingsApi from '../api/listings';

const menuItems = [
  {
    title: 'Mis Registros',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
  },
];

export const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const listingApi = useApi(listingsApi.getListings);


  const onMyListingsSearch = async () => {
    setProgress(0);
    setUploadVisible(true);

    const searchParams = `?createdBy=${user._id}`;

    const { data: result, status } = await listingApi.request(searchParams)
    if (status === 400) {
      return logOut();
    }

    setUploadVisible(false);
    navigation.navigate(routes.LISTING, result?.docs);
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={user.image}
          avatar={user.name}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={onMyListingsSearch}
            />
          )}
        ></FlatList>
      </View>
      <ListItem
        title='Salir'
        IconComponent={<Icon name='logout' backgroundColor={colors.yellow} />}
        onPress={() => logOut()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
