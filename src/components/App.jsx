import { Component, createRef } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { getImagesBySearchQuery } from 'services/getImages';

export class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    images: [],
    totalImages: null,
    isLoading: false,
  };

  imagesGalleryRef = createRef();

  getSnapshotBeforeUpdate(_, prevState) {
    if (prevState.images.length < this.state.images.length) {
      return this.imagesGalleryRef.current.scrollHeight;
    }
    return null;
  }

  async componentDidUpdate(_, prevState, snapshot) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      (prevState.currentPage !== this.state.currentPage &&
        this.state.currentPage !== 1)
    ) {
      await this.getImages();
    }

    if (snapshot) {
      window.scrollTo({ top: snapshot, behavior: 'smooth' });
    }
  }

  getImages = async () => {
    const { currentPage, searchQuery } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits, total } = await getImagesBySearchQuery(
        searchQuery,
        currentPage
      );
      this.setState(prevState => {
        return currentPage === 1
          ? { images: [...hits], totalImages: total }
          : {
              images: [...prevState.images, ...hits],
            };
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setSearchQuery = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 });
  };

  updatePage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { totalImages, images, isLoading } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.setSearchQuery} />

        <ImageGallery
          images={images}
          imagesGalleryRef={this.imagesGalleryRef}
        />

        {isLoading && <Loader />}

        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.updatePage} />
        )}
      </>
    );
  }
}
