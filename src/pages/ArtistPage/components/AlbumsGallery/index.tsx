import React, { FC, useEffect, useRef } from "react";
import { AlbumDetail } from "../../../../types/index.ts";
import { truncateString } from "../../../../utils/index.ts";

type Props = {
  albums: AlbumDetail[];
};

const AlbumsGallery: FC<Props> = ({ albums }) => {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const THRESHOLD = 0.6;
  const MAX_SPEED = 25;
  const LEFT = "left";
  const RIGHT = "right";
  let scrolling: NodeJS.Timeout | null;
  let pageX: number | null;
  let screenWidth: number | null;

  useEffect(() => {
    enableGalleryScroll();

    return () => {
      endScroll();
    };
  }, []);

  const enableGalleryScroll = () => {
    if (galleryRef.current) {
      galleryRef.current.addEventListener("mouseover", handleGalleryMouseOver);
    }
  };

  const handleGalleryMouseOver = (event: MouseEvent) => {
    pageX = event.clientX || event.screenX;
    screenWidth = window.innerWidth;

    if (pageX !== null && screenWidth !== null) {
      const currentPosPercentage = (screenWidth - pageX) / screenWidth;
      let speed;

      if (currentPosPercentage > THRESHOLD) {
        speed = calculateSpeed(LEFT, currentPosPercentage);
        setScroll(LEFT, speed);
      } else if (currentPosPercentage < 1 - THRESHOLD) {
        speed = calculateSpeed(RIGHT, currentPosPercentage);
        setScroll(RIGHT, speed);
      } else {
        endScroll();
      }
    }
  };

  const calculateSpeed = (direction: string, ratio: number) => {
    const positionPercentage = direction === LEFT ? ratio : 1 - ratio;
    const speedPercentage = (positionPercentage - THRESHOLD) / (1 - THRESHOLD);
    return speedPercentage * MAX_SPEED;
  };

  const endScroll = () => {
    if (scrolling) {
      clearInterval(scrolling);
      scrolling = null;
    }
  };

  const setScroll = (direction: string, speed: number) => {
    endScroll();
    if (galleryRef.current) {
      scrolling = setInterval(() => {
        const newPos = direction === LEFT ? -speed : speed;
        if (galleryRef.current) {
          galleryRef.current.scrollLeft += newPos;
        }
      }, 10);
    }
  };

  return (
    <div className="gallery" ref={galleryRef}>
      {albums &&
        albums.map((album) => (
          <div className="album" key={album.id}>
            <span className="album_title">{truncateString(album.name)}</span>
            <img src={album.image} alt={album.name} className="album_img" />
          </div>
        ))}
    </div>
  );
};

export { AlbumsGallery };
