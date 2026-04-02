import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Avatar from '../components/Avatar';
import { MOCK_POSTS } from '../data/mockData';

const CreatePostScreen = () => {
  const currentUser = MOCK_POSTS.find((post) => post.id === '1')?.user;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <Avatar uri={currentUser?.avatar} size={56} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{currentUser?.username || 'unknown'}</Text>
          <Text style={styles.subText}>{currentUser?.bio || 'Write something new today.'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Ảnh bài đăng</Text>
        <TouchableOpacity style={styles.imagePlaceholder} activeOpacity={0.8}>
          <Text style={styles.imagePlaceholderTitle}>Chọn ảnh</Text>
          <Text style={styles.imagePlaceholderSubtitle}>Nhấn để thêm ảnh cho bài viết của bạn</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nội dung</Text>
        <TextInput
          style={styles.captionInput}
          placeholder="Bạn đang nghĩ gì?"
          placeholderTextColor="#9aa0a6"
          multiline
          textAlignVertical="top"
          numberOfLines={6}
        />
      </View>

      <TouchableOpacity style={styles.postButton} activeOpacity={0.85}>
        <Text style={styles.postButtonText}>Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f6f7fb',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subText: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  imagePlaceholder: {
    height: 180,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#c7d2fe',
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  imagePlaceholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4338ca',
  },
  imagePlaceholderSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#6366f1',
    textAlign: 'center',
    lineHeight: 18,
  },
  captionInput: {
    minHeight: 160,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  postButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default CreatePostScreen;