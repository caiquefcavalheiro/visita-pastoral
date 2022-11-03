import { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { CarouselCard } from "./CarouselCard";

export const CarouselComponent = (props: any) => {
  const [active, setActive] = useState(0);

  return (
    <Carousel
      layout={"default"}
      data={props.carouselItems}
      sliderWidth={470}
      itemWidth={280}
      renderItem={CarouselCard}
      onSnapToItem={(index) => setActive(index)}
    />
  );
};
