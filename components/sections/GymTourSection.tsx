import { getGymTourImages } from "@/lib/media-scan";
import { GymTour } from "./GymTour";

export function GymTourSection() {
  const images = getGymTourImages();
  return <GymTour images={images} />;
}
