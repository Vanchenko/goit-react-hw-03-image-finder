import axios from "axios";

const URL = "https://pixabay.com/api/";
const options = {
    params: {
        key: '35244614-3f1384186f27e7cacc119fb8b',
        //  page: page,
        per_page: 12,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    }
}

export const loadImagesPixabay = async searchQuery => {
    const response = await axios.get(URL, options);
   // console.log('cls from API:',response);
    return response.data.hits;
}

