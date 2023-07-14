import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const items = [
  {
    id: 1,
    image: require('./src/assets/ayasofya.png'),
    title: 'Ayasofya Camii',
  },
  {
    id: 2,
    image: require('./src/assets/dolmabahce.png'),
    title: 'Dolmabahçe Sarayı',
  },

  {
    id: 3,
    image: require('./src/assets/galata.png'),
    title: 'Galata Kulesi',
  },
  {
    id: 4,
    image: require('./src/assets/topkapi.png'),
    title: 'Topkapı Sarayı',
  },
  {
    id: 5,
    image: require('./src/assets/yerebatan.png'),
    title: 'Yerebatan Sarnıcı',
  },
];

export default function App() {
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        data={items}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimation}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}) => {
          const inputRange = [
            width * (index - 0.5),
            width * index,
            width * (index + 0.5),
          ];
          return (
            <View style={styles.item}>
              <Animated.Image
                source={item.image}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.titleContainer,
                  {
                    opacity: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange,
                          outputRange: [250, 0, -250],
                        }),
                      },
                    ],
                  },
                ]}>
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
              <Animated.View
                style={[StyleSheet.absoluteFillObject, styles.itemOverlay]}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 60,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, .25)',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontVariant: ['small-caps']
  },
  itemOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
