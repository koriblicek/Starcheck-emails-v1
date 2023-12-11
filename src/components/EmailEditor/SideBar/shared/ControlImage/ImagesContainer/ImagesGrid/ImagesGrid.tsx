import { Grid, ImageList, ImageListItem } from "@mui/material";

interface IImagesGrid {
    imageLinks: string[];
    onImageSelected: (imageSrc: string) => void;
}
export function ImagesGrid({ imageLinks, onImageSelected }: IImagesGrid) {
    const images = imageLinks.map((imageLink, index) => {
        return <ImageListItem key={index} sx={{ cursor: 'pointer' }} onClick={() => onImageSelected(imageLink)}>
            <img
                src={`${imageLink}`}
                alt=""
            />
        </ImageListItem>;
    });

    return (
        <Grid container p={1} >
            <Grid item xs>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {images}
                </ImageList>
            </Grid>
        </Grid>
    );
}
