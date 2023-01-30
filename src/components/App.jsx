import { useState, useEffect, useCallback, useRef } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { getImagesBySearchQuery } from 'services/getImages';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const imagesGalleryRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      (async () => {
        try {
          setLoadingStatus(true);
          const { hits, total } = await getImagesBySearchQuery(
            searchQuery,
            currentPage
          );
          setImages(prevImages =>
            currentPage === 1 ? [...hits] : [...prevImages, ...hits]
          );
          setTotalImages(total);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingStatus(false);
        }
      })();
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({
        top: imagesGalleryRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentPage, images]);

  const addSearchQuery = useCallback(searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  }, []);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar addSearchQuery={addSearchQuery} />

      <ImageGallery images={images} imagesGalleryRef={imagesGalleryRef} />

      {isLoading && <Loader />}

      {images.length > 0 && images.length < totalImages && (
        <Button onClick={updatePage} />
      )}
    </>
  );
};
