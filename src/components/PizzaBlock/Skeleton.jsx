import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#e9f0f0"
    foregroundColor="#e9f0f0"
    {...props}>
    <rect x="0" y="320" rx="10" ry="10" width="280" height="85" />
    <rect x="50" y="270" rx="10" ry="10" width="180" height="35" />
    <rect x="0" y="427" rx="8" ry="8" width="95" height="25" />
    <rect x="125" y="420" rx="20" ry="20" width="155" height="40" />
    <circle cx="140" cy="123" r="123" />
  </ContentLoader>
);

export default Skeleton;
