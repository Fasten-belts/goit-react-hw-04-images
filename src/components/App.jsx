import React, { Component } from 'react';
import { fetchImages } from 'services/api';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    loading: false,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.upLoadImages();
    }
  }

  upLoadImages = async () => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.query,
        this.state.page
      );
      if (!totalHits) {
        toast.error(
          'Sorry, nothing was found for your request, please try something else.',
          {
            icon: '🫣',
          }
        );
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits,
      }));

      if (this.state.images.length < 12) {
        return toast.success(`Hooray! We found ${totalHits} images.`, {
          icon: '👏',
        });
      }
    } catch (error) {
      this.setState({ error: true });
      toast.error('Oops, something went wrong.Please try again later.', {
        icon: '🆘',
      });
    } finally {
      this.setState({ loading: false, error: false });
    }
  };

  handleSubmit = value => {
    this.setState({
      query: `${value}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { loading, totalHits, images } = this.state;
    const pages = totalHits / 12;
    const loadMore = this.handleLoadMore;
    const onSubmit = this.handleSubmit;

    return (
      <Layout>
        <SearchBar onSubmit={onSubmit} />
        {loading && <Loader />}
        {totalHits > 0 && <ImageGallery images={images} />}
        {totalHits > 0 && pages > 1 && !loading && (
          <Button onLoadMore={loadMore} />
        )}
        <GlobalStyle />
        <Toaster position="top-right" reverseOrder={true} />
      </Layout>
    );
  }
}
