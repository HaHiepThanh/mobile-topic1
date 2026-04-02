import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PostItem from '../components/PostItem';
import { MOCK_POSTS } from '../data/mockData';

const FeedScreen = ({ navigation }) => {
  const handleUserPress = (user) => {
    navigation.navigate('Profile', { user });
  };

  const renderItem = ({ item }) => (
    <PostItem post={item} onUserPress={handleUserPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  listContent: {
    paddingVertical: 10,
  }
});

export default FeedScreen;
