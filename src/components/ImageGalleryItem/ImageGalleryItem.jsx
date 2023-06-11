import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({  webformatURL, largeImageURL }) => (
    <li className={css.ImageGalleryItem} >
        <img className={css.ImageGalleryItemImage} src={webformatURL} alt="" data-bigimg={ largeImageURL } />
    </li>
)

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}