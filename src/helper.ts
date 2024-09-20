import axios from "axios";

export interface Images {
    id: number;
    webformatURL: string; // corrected from "webFormatURL"
    largeImageURL: string; // corrected from "largeImageURl"
    user: string;
    tags: string;
}

export const fetchImages = async (query: string = ''): Promise<Images[]> => {
  

    const URL = `https://pixabay.com/api/?key=46085488-845d77f5604c0f8d80a2ed90f&q=${query}&image_type=photo&pretty=true`;
    const response = await axios.get(URL);

    return response.data.hits;
};
