import React, { useState, useEffect } from "react";


import ImageCard from "./components/ImageCard";


import ImageSearch from "./components/ImageSearch";







function App() {

  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [term, setTerm] = useState('love');





  useEffect(() => {
    const URL = `https://pixabay.com/api/?key=${process.env.REACT_APP_KEY}&q=${term}&image_type=photo&pretty=true`
    const fetchData = async () => {
      try {
        const data = await fetch(URL);
        const { hits } = await data.json();
        setImages(hits);
        setIsLoading(false)
        // console.log(hits);
      } catch (error) {
        console.log(error);
      }

    }


    fetchData()

  }, [term])



  return (
    <div className="container mx-auto mt-5">

      <ImageSearch setText={(text) => setTerm(text)} />


      {!isLoading && images.length === 0 && <h1 className="text-5xl text-red-500 text-center mx-auto mt-32">Oops...!!! No data..</h1>}



      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => {
          return <ImageCard key={img.id} img={img} />
        })}
      </div>}
    </div>
  );
}

export default App;
