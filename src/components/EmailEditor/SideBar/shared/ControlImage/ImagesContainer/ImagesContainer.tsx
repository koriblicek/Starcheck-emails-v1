import { useState } from "react";
import { ImageListLoader } from "./ImageListLoader";
import { ImagesGrid } from "./ImagesGrid";
import { useAppSelector } from "../../../../../../store/hooks";

interface IImageContainerProps {
    onImageSelected: (imageSrc: string) => void;
}

export function ImagesContainer({ onImageSelected }: IImageContainerProps) {

    const { imagesURL } = useAppSelector(state => state.emailsSettings.urls);

    const [imageData, setImageData] = useState<string[]>();

    function handleImageData(loadedData: string[]) {
        if (loadedData.length > 0) {
            setImageData(loadedData);
        } else {
            setImageData([]);
        }
    }

    return (
        <>
            {!imageData && <ImageListLoader path={imagesURL} onImageData={handleImageData} />}
            {imageData && <ImagesGrid imageLinks={imageData} onImageSelected={onImageSelected} />}
        </>
    );
}
