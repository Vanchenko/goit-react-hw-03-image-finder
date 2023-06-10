import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { loadImagesPixabay } from 'api/api';
import css from './App.module.css';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchWord: '',
    images: [],
    showModal: false,
    showMoreBtn: false,
    bigImage: '',
    page: 1,
    error: null,
    isLoading: false,
    isEmpty: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    console.log('cDU:', this.state.searchWord);
    const { searchWord, page } = this.state;
    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const resp = await loadImagesPixabay(searchWord, page);
        console.log('didMount: ', resp);
        if (!resp.length) {
          this.setState({
            isEmpty: true,
            isLoading: false,
            showMoreBtn: false,
          });
          return;
        }
        const tmp = this.state.images.concat(resp);
        this.setState({
          images: tmp,
          showMoreBtn: resp.length >= PER_PAGE,
        });
      } catch (error) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
      this.setState({ isLoading: false });
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const sw = evt.target.elements[1].value;
    console.log('SearchWord', sw);
    if (sw !== '') {
      this.setState({
        searchWord: sw,
        page: 1,
        images: [],
        showModal: false,
        bigImage: '',
        isLoading: false,
        isEmpty: false,
      });
    }
  };

  onLoadMore = () => {
    //  console.log('Btn LoadMore', evt.currentTarget);
    // const tt = this.state.page + 1;
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onImageClick = evt => {
    console.dir(evt.target.dataset.bigimg);
    this.setState({ showModal: true });
    this.setState({ bigImage: evt.target.dataset.bigimg });
  };
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, showMoreBtn, isLoading, isEmpty, bigImage, images } = this.state;
    return (
      <div className={css.App}>
        <Searchbar SearchOnSubmit={this.onSubmit} />
        <ImageGallery images={images} onImageClick={this.onImageClick} />
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{ }}
            wrapperClass={css.wrapperClass}
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {isEmpty && (
          <p className={css.messageIsEmpty}>
            Sorry. There are no images ... 😭
          </p>
        )}
        {showMoreBtn && <Button onLoadMore={this.onLoadMore} />}
        {showModal && (
          <Modal bigImage={bigImage}>
            <button type="button" onClick={this.onCloseModal}>
              Close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
