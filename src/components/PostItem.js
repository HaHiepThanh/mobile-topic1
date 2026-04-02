import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';
import ActionButton from './ActionButton';

const PostItem = ({ post, onUserPress }) => {
  const handleUserPress = () => {
    if (onUserPress) onUserPress(post.user);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar uri={post.user.avatar} size={40} onPress={handleUserPress} />
        <TouchableOpacity onPress={handleUserPress}>
          <Text style={styles.username}>{post.user.username}</Text>
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image 
        source={typeof post.post_image === 'string' ? { uri: post.post_image } : post.post_image} 
        style={styles.image} 
        resizeMode="cover" 
      />

      {/* Actions */}
      <View style={styles.actions}>
        <ActionButton title={'Like (' + post.likes + ')'} icon="❤️" onPress={() => {}} />
        <ActionButton title={'Comment (' + post.comments + ')'} icon="💬" onPress={() => {}} />
        <ActionButton title={'Share (' + post.shares + ')'} icon="🔗" onPress={() => {}} />
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.likes}>{post.likes} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.user.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.metaText}>
          {post.comments} comments • {post.shares} shares
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  captionContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: '#333',
  },
  metaText: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  }
});

export default PostItem;
