import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={469}
    viewBox="0 0 280 469"
    backgroundColor="#ffffff"
    foregroundColor="#fbf0ea"
    {...props}>
    <circle cx="130" cy="122" r="120" />
    <rect x="54" y="268" rx="0" ry="0" width="160" height="20" />
    <rect x="4" y="308" rx="10" ry="10" width="269" height="87" />
    <rect x="2" y="422" rx="5" ry="5" width="89" height="33" />
    <rect x="126" y="412" rx="20" ry="20" width="148" height="49" />
  </ContentLoader>
);

export default MyLoader;
