export const MOCK_POSTS = [
  {
    id: '1',
    created_at: '2026-03-28T08:30:00Z',
    user: {
      id: 'u1',
      username: 'thanhhahiep',
      avatar: require('../../assets/thanh.jpg'),
      bio: 'Lover of code and coffee.',
      location: 'Ho Chi Minh City, Vietnam'
    },
    post_image: require('../../assets/beach.jpg'),
    caption: 'Learning React Native today! 🚀 #coding',
    likes: 120,
    comments: 15,
    shares: 8
  },
  {
    id: '2',
    created_at: '2026-03-29T14:15:00Z',
    user: {
      id: 'u2',
      username: 'janedoe',
      avatar: 'https://i.pravatar.cc/150?u=u2',
      bio: 'Traveler, photographer, dreamer.',
      location: 'Ho Chi Minh City, Vietnam'
    },
    post_image: require('../../assets/reactnative.png'),
    caption: 'Beautiful sunset at the beach 🌅',
    likes: 345,
    comments: 42,
    shares: 24
  },
  {
    id: '3',
    created_at: '2026-03-30T19:45:00Z',
    user: {
      id: 'u3',
      username: 'alexdev',
      avatar: 'https://i.pravatar.cc/150?u=u3',
      bio: 'Mobile developer. Building useful things every day.',
      location: 'Ha Noi, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    caption: 'Late night debugging session. Finally fixed the layout issue! 💡',
    likes: 289,
    comments: 31,
    shares: 17
  },
  {
    id: '4',
    created_at: '2026-03-31T08:10:00Z',
    user: {
      id: 'u4',
      username: 'linhng',
      avatar: 'https://i.pravatar.cc/150?u=u4',
      bio: 'UI/UX enthusiast and cafe hunter.',
      location: 'Can Tho, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sunday brunch and wireframes. Perfect combo ✨',
    likes: 198,
    comments: 22,
    shares: 11
  },
  {
    id: '5',
    created_at: '2026-03-31T12:55:00Z',
    user: {
      id: 'u5',
      username: 'minhtran',
      avatar: 'https://i.pravatar.cc/150?u=u5',
      bio: 'Runner | Reader | React Native learner.',
      location: 'Hue, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80',
    caption: 'Morning run done. Time to ship features 🏃',
    likes: 256,
    comments: 19,
    shares: 14
  },
  {
    id: '6',
    created_at: '2026-03-31T18:40:00Z',
    user: {
      id: 'u6',
      username: 'thao.le',
      avatar: 'https://i.pravatar.cc/150?u=u6',
      bio: 'Frontend engineer. Love clean interfaces.',
      location: 'Hai Phong, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Team sync today was super productive 🤝',
    likes: 312,
    comments: 37,
    shares: 20
  },
  {
    id: '7',
    created_at: '2026-04-01T07:20:00Z',
    user: {
      id: 'u7',
      username: 'anhpham',
      avatar: 'https://i.pravatar.cc/150?u=u7',
      bio: 'Coffee first, code second.',
      location: 'Nha Trang, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    caption: 'New cafe discovered for remote work ☕',
    likes: 167,
    comments: 12,
    shares: 9
  },
  {
    id: '8',
    created_at: '2026-04-01T10:05:00Z',
    user: {
      id: 'u8',
      username: 'quocnguyen',
      avatar: 'https://i.pravatar.cc/150?u=u8',
      bio: 'Building side projects after office hours.',
      location: 'Vung Tau, Vietnam'
    },
    post_image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    caption: 'Prototype approved! Next stop: production 🚀',
    likes: 401,
    comments: 45,
    shares: 28
  }
];
