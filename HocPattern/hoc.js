import React, { useState, useEffect } from "react";

function withLoader(Component, url) {
  return function LoaderComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, [url]);

    if (loading) return <div>Loading...</div>;
    return <Component data={data} {...props} />;
  };
}

function DogImages({ data }) {
  return (
    <div>
      {data.message.map((src, index) => (
        <img key={index} src={src} alt="dog" />
      ))}
    </div>
  );
}

const EnhancedDogImages = withLoader(
  DogImages,
  "<https://dog.ceo/api/breed/labrador/images/random/6>"
);
