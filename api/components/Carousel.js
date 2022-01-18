import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";

const fetchPhoto = (photos) => {
    
  return photos.map((photo) => (
    <Image
      key={photo.id}
      style={styles.carouselImage}
      source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
    />
  ));
};

const Carousel = (props) => {
    console.log(props.photos[0].title)
  return (
    <ScrollView horizontal={true} style={styles.carousel}>
      {fetchPhoto(props.photos)}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
  },
});

export default Carousel;
