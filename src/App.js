import React, { useState, useEffect } from "react";


import ImageCard from "./components/ImageCard";










function App() {

  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [term, setTerm] = useState('love');

  const URL = `https://pixabay.com/api/?key=${process.env.REACT_APP_KEY}&q=${term}&image_type=photo&pretty=true`



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(URL);
        const { hits } = await data.json();
        setImages(hits);
        setIsLoading(false)
        console.log(hits);
      } catch (error) {
        console.log(error);
      }

    }


    fetchData()

  }, [URL])



  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => {
          return <ImageCard key={img.id} img={img} />
        })}
      </div>
    </div>
  );
}

export default App;
