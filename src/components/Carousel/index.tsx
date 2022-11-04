import { Center, Text, View, Image } from "native-base";
import * as React from "react";
import { Animated, useWindowDimensions } from "react-native";

export function CarouselComponent(props: any) {
  const { data } = props;

  const { width } = useWindowDimensions();

  const IMAGE_WIDTH = React.useMemo(() => width * 0.7, [width]);

  const IMAGE_HEIGHT = React.useMemo(() => IMAGE_WIDTH * 1, [IMAGE_WIDTH]);

  const images = React.useMemo(
    () => [
      "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    ],
    []
  );

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0, 1, 0],
            });

            return (
              <>
                <View
                  style={{
                    width,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 40,
                  }}
                >
                  <Animated.View
                    children={
                      <Center>
                        <Image
                          style={{
                            width: IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                            resizeMode: "cover",
                            borderRadius: 16,
                            marginBottom: 10,
                          }}
                          source={{ uri: item.image_url }}
                          alt="image"
                        />
                        <Text>{item.title}</Text>
                      </Center>
                    }
                  />
                </View>
              </>
            );
          }}
          keyExtractor={(item) => item.id}
          data={data}
        />
      </View>
    </>
  );
}
