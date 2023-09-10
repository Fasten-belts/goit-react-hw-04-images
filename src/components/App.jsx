import React, { useState, useEffect } from 'react';
import { fetchImages } from 'services/api';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Layout } from './Layout';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    upLoadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  async function upLoadImages() {
    try {
      setLoading(true);
      const { hits, totalHits } = await fetchImages(query, page);
      if (!totalHits) {
        toast.error(
          'Sorry, nothing was found for your request, please try something else.',
          {
            icon: '🫣',
          }
        );
        return;
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setTotalHits(totalHits);

      if (images.length < 12) {
        toast.success(`Hooray! We found ${totalHits} images.`, {
          icon: '👏',
        });
      }
    } catch (error) {
      setError(true);
      toast.error('Oops, something went wrong.Please try again later.', {
        icon: '🆘',
      });
    } finally {
      setLoading(false);
      setError(false);
    }
  }

  function handleSubmit(value) {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(error);
  }

  function handleLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  const pages = Math.ceil(totalHits / images.length);

  return (
    <Layout>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && pages > 1 && !loading && (
        <Button onLoadMore={handleLoadMore} />
      )}
      <GlobalStyle />
      <Toaster position="top-right" reverseOrder={true} />
    </Layout>
  );
}

export { App };
