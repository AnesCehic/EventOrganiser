import React from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import dayjs from 'dayjs';

import {PostItem} from '@components';
import {Styles} from '@common';
import UserIcon from '@assets/ImageComponents/UserIcon';
import {NewPost, TimeCircle} from '@assets/SvgIcons';

const PostsList = ({
  data,
  navigation,
  headerData,
  handleRefresh,
  style,
  route,
  hideHeaderContent,
  hasMore,
  onEndReached,
  userData,
  isDarkMode,
}) => {
  const renderFeaturedPosts = () => {
    let shouldCreateNewPostBeVisible = !route?.params?.userId;
    return (
      <View>
        {headerData?.length !== 0 ? (
          <View>
            <Text
              style={[
                styles.featuredItemHeader,
                isDarkMode && {color: Styles.Colors.white},
              ]}>
              Upcoming Events
            </Text>
            <FlatList
              style={styles.headerList}
              data={headerData}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderFeaturedItem}
            />
          </View>
        ) : null}
        <Text
          style={[
            styles.latestUpdate,
            isDarkMode && {color: Styles.Colors.white},
          ]}>
          Latest updates
        </Text>
        {shouldCreateNewPostBeVisible && (
          <TouchableOpacity
            style={[
              styles.createPost,
              isDarkMode && {backgroundColor: '#1C2329', borderWidth: 0},
            ]}
            onPress={() => navigation.navigate('CreatePost')}>
            {userData?.avatarImg ? (
              <Image
                source={{uri: userData.avatarImg}}
                style={styles.createPostImage}
              />
            ) : (
              <UserIcon style={styles.createPostImage} />
            )}
            <View
              style={[
                styles.createPostText,
                isDarkMode && styles.backgroundPostColorDarkMode,
              ]}>
              <Text
                style={
                  isDarkMode
                    ? {color: Styles.Colors.white}
                    : {color: Styles.Colors.black}
                }>
                Create a new post
              </Text>
              <View style={styles.imageContainer}>
                <NewPost />
                {/* <Image
                  style={styles.image}
                  source={require('../../assets/Gallery.png')}
                /> */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderFeaturedItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.featuredItemContainer,
          isDarkMode && styles.backgroundPostColorDarkMode,
        ]}
        onPress={() => {
          navigation.navigate('FeedDetails', {
            id: item._id,
          });
        }}>
        <View style={styles.featuredItemTop}>
          <View style={styles.featuredItemTopDate}>
            <Text style={styles.day}>{dayjs(item.start).format('DD')}</Text>
            <Text style={styles.month}>
              {dayjs(item.start).format('MMM').toUpperCase()}
            </Text>
          </View>
          <ImageBackground
            imageStyle={{opacity: 0.08}}
            source={{uri: item.upload?.files[0]?.signedURL}}
            style={[
              styles.featuredItemTopTime,
              isDarkMode && {
                borderWidth: 0,
                backgroundColor: Styles.Colors.white,
              },
            ]}>
            <TimeCircle />
            {/* <Icon name="ri-time-fill" color="#684BA6" size={13} /> */}
            <Text style={styles.featuredItemTopTimeText}>
              {dayjs(item.start).format('hh:mm A')}
            </Text>
          </ImageBackground>
        </View>

        <View style={styles.featuredItemBottom}>
          <Text
            style={[
              styles.featuredItemBottomText,
              isDarkMode && {color: Styles.Colors.white},
            ]}>
            {item.title.length > 18
              ? `${item.title.slice(0, 18)}...`
              : item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item: post}) => {
    return (
      <PostItem
        isDarkMode={isDarkMode}
        styleDarkMode={styles.backgroundPostColorDarkMode}
        key={post._id}
        onPress={() =>
          navigation.navigate('PostDetails', {
            id: post.id,
          })
        }
        img={post.img}
        time={post.time}
        content={post.content}
        owner={post.owner}
        createdAt={post.createdAt}
      />
    );
  };

  const renderList = () => {
    return (
      <FlatList
        ListHeaderComponent={hideHeaderContent ? null : renderFeaturedPosts}
        data={data}
        style={style}
        renderItem={renderItem}
        onEndReached={onEndReached}
        keyExtractor={item => item.id}
        refreshing={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        // onScroll={e => {
        //   const scrollOffset = e.nativeEvent.contentOffset.y;
        //   console.log('scroll off', scrollOffset);
        // }}
      />
    );
  };

  return renderList();
};

const styles = StyleSheet.create({
  featuredItemContainer: {
    backgroundColor: Styles.Colors.darkBgLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    padding: 12,
    marginRight: 8,
    minHeight: 100,
    margin: 12,
    ...Styles.Shadows.textBox,
  },
  featuredItemTop: {
    flexDirection: 'row',
  },
  backgroundPostColorDarkMode: {
    backgroundColor: '#273038',
    borderWidth: 0,
  },
  featuredItemTopDate: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6EBF0',
    backgroundColor: '#fff',
    ...Styles.Shadows.textBox,
  },
  featuredItemTopTime: {
    flexDirection: 'row',
    width: 122,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6EBF0',
    marginLeft: 12,
  },
  featuredItemTopTimeText: {
    marginLeft: 7,
    color: Styles.Colors.purple,
    fontWeight: '700',
    fontSize: 10,
  },
  day: {
    fontWeight: '700',
    fontSize: 16,
    color: Styles.Colors.black,
  },
  month: {
    fontSize: 9,
    color: Styles.Colors.purple,
  },
  featuredItemBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  featuredItemBottomText: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: Styles.Fonts.headerBold,
    color: Styles.Colors.black,
  },
  featuredItemHeader: {
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: '700',
    color: Styles.Colors.white,
    fontFamily: Styles.Fonts.header,
  },
  latestUpdate: {
    paddingLeft: 16,
    fontSize: 16,
    color: '#273038',
    fontFamily: Styles.Fonts.headerMedium,
  },
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    borderColor: Styles.Colors.addPhotoBorder,
    backgroundColor: Styles.Colors.white,
    borderWidth: 1,
    ...Styles.Shadows.textBox,
  },
  createPostText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 50,
    backgroundColor: '#F5F6F7',
    padding: 5,
    paddingLeft: 16,
    paddingHorizontal: 8,
  },
  createPostImage: {
    width: 32,
    height: 32,
    marginRight: 6,
    borderRadius: 50,
    padding: 10,
  },
  postAvatarImage: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    backgroundColor: Styles.Colors.white,
    padding: 8,
    borderRadius: 50,
  },
  image: {
    height: 20,
    width: 20,
  },
  userImage: {
    width: 32,
    height: 32,
  },
});

export default PostsList;
