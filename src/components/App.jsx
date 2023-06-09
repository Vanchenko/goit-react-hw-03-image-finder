import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Audio } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { loadImagesPixabay } from "api/api";
import axios from "axios";
import css from './App.module.css'

// const URL = "https://pixabay.com/api/";
// const options = {
//   params: {
//         key: '35244614-3f1384186f27e7cacc119fb8b',
//       //  page: page,
//         per_page: 12,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//     }
// }
export class App extends Component {
  state = {
    searchWord: '',
    images: [],
    showModal: false,
    bigImage:'',
  }

  async componentDidMount() {
    try {
      const resp = await loadImagesPixabay();
      console.log('didMount: ', resp);
      this.setState({ images: resp });
    } catch (error) {
      
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const sw = evt.target.elements[1].value;
    console.log('SearchWord',sw)
  if ( sw !== '') { this.setState({ searchWord : sw })}
  }
  onLoadMore = evt => {
    console.log('Btn LoadMore', evt.currentTarget)
  }
  onImageClick = evt => {
    console.dir(evt.target.dataset.bigimg);
    this.setState({ showModal: true });
    this.setState({ bigImage: evt.target.dataset.bigimg });

  }
  onCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const test = this.state.searchWord;
    const images = this.state.images;
    const { showModal, bigImage } = this.state;
    return (
      <div className={css.App}>
        <Searchbar SearchOnSubmit={this.onSubmit} />
        {!showModal && (<>
          <ImageGallery images={images} onImageClick={this.onImageClick} />
          <Button onLoadMore={this.onLoadMore} />
          </>
         )}
        {showModal && (<Modal bigImage={bigImage}>
          <button type="button" onClick={this.onCloseModal}>Close</button>
        </Modal>)}
        {/* <Audio /> */}
        <p>{test}</p>
      </div>
    );
  }
}
