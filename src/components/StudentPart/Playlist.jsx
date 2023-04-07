import React from "react";
import { useGetVideosQuery } from "../../features/videos/videoSlice";
import "../../style/output.css";
import Error from "../ui/Error";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import VideoList from "./VideoList";

const Playlist = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message="No videos found!" />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <VideoList key={video.id} video={video} />);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default Playlist;
