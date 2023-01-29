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

  const isFirstPageLoading = useRef(true);
  const imagesGalleryRef = useRef(null);

  useEffect(() => {
    console.log('status', isFirstPageLoading.current);
    console.log('query', searchQuery);
    if (!isFirstPageLoading.current) {
      console.log('Get Images');
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

          if (currentPage > 1) {
            console.log(imagesGalleryRef.current.scrollHeight);
            window.scrollTo({
              top: imagesGalleryRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingStatus(false);
        }
      })();
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    isFirstPageLoading.current = false;
  }, []);

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
