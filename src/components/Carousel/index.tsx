import { Center, Text, View, Image } from "native-base";
import * as React from "react";
import { Animated, useWindowDimensions } from "react-native";

export function CarouselComponent(props: any) {
  const { data } = props;

  const { width } = useWindowDimensions();

  const IMAGE_WIDTH = React.useMemo(() => width * 0.7, [width]);

  const IMAGE_HEIGHT = React.useMemo(() => IMAGE_WIDTH * 1, [IMAGE_WIDTH]);

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
                          source={{ uri: item.imageChurch }}
                          alt="image"
                        />
                        <Text>{item.name}</Text>
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
