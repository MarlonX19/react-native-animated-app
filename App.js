import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Animated, Image, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

import { DATA } from './data';

const DOT_SIZE = 15;

export default function App() {
  const animatedValue = new Animated.Value(0);


  const Pages = () => {
    let inputRange = [-width, 0, width];
    const translatingX = animatedValue.interpolate({
      inputRange,
      outputRange: [-DOT_SIZE, 0, DOT_SIZE]
    })

    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30 }}>
        <Animated.View
          style={{
            height: DOT_SIZE,
            width: DOT_SIZE,
            borderRadius: DOT_SIZE / 2,
            backgroundColor: '#fff',
            position: 'absolute',
            transform: [
              { translateX: translatingX }
            ]
          }}
        />
        {DATA.map((item, index) => {
          return (
            <View key={index}
              style={{
                borderRadius: DOT_SIZE / 2,
                borderWidth: 1,
                borderColor: '#ccc',
                height: DOT_SIZE,
                width: DOT_SIZE,
              }}
            />
          )
        })}
      </View >
    )

  }

  const Item = ({ image, title, index }) => {

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    const opacity = animatedValue.interpolate({
      inputRange,
      outputRange: [0, 1, 0]
    })

    const scale = animatedValue.interpolate({
      inputRange,
      outputRange: [0, 1, 0]
    })

    const border = animatedValue.interpolate({
      inputRange,
      outputRange: [300, 1, 300]
    })


    return (
      <View>
        <View style={{ position: 'absolute', bottom: 50, zIndex: 1, alignSelf: 'center' }}>
          <Text style={{ fontSize: 25, color: '#fff' }}>{title}</Text>
        </View>
        <Animated.Image
          source={{ uri: image }}
          style={{
            height, width,
            borderRadius: border,
            opacity: opacity,
            transform: [
              { scale: scale }
            ]
          }} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <Item {...item} index={index} />
        }}
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [{
            nativeEvent: {
              contentOffset: {
                x: animatedValue
              }
            }
          }],
          { useNativeDriver: true }
        )}
      />
      <Pages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
