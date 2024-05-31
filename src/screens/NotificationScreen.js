import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

function NotificationScreen({ notifications, clearNotifications }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.noNotifications}>
          <Text style={styles.noNotificationsText}>No notifications available</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Button title="Clear All Notifications" onPress={clearNotifications} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default NotificationScreen;
