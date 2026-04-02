import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const Avatar = ({ uri, size = 50, onPress }) => {
  const avatarSource = typeof uri === 'string' ? { uri } : uri;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <Image
        source={avatarSource}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#ddd',
  }
});

export default Avatar;
