import axios from "axios";
import { saveAs } from 'file-saver';

export interface Images {
    id: number;
    webformatURL: string;
    largeImageURL: string; 
    user: string;
    tags: string;
}

export const fetchImages = async (query: string = ''): Promise<Images[]> => {
    const URL = `https://pixabay.com/api/?key=46085488-845d77f5604c0f8d80a2ed90f&q=${query}&image_type=photo&pretty=true`;
    const response = await axios.get(URL);
    return response.data.hits;
};

export const createShareUrls = (imageUrl: string) => {
    return {
        instagram: `https://www.instagram.com/share?url=${encodeURIComponent(imageUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`
    };
};

export const downloadImage = ({url, fileName}: {url: string, fileName:string}) => {
    saveAs(url, `${fileName}.jpg`);
};
