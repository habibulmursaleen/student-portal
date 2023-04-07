import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Playlist from "../../components/StudentPart/Playlist";
import VideoDescription from "../../components/StudentPart/VideoDescription";
import Error from "../../components/ui/Error";
import DescriptionLoader from "../../components/ui/loaders/DescriptionLoader";
import PlayerLoader from "../../components/ui/loaders/PlayerLoader";
import { useGetVideoQuery } from "../../features/videos/videoSlice";
import "../../style/output.css";

const CoursePlayer = () => {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <>
        <VideoDescription video={video} />
        <Playlist />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">{content}</div>
        </div>
      </section>
    </div>
  );
};

export default CoursePlayer;
