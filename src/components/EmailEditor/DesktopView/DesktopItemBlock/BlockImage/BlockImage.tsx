import { IBlockImage } from '../../../../../types';
import imageBlockDefault from '../../../../../assets/images/image-block-default.png';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks';
import { Alert, AlertTitle, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IBlockImageProps {
    block: IBlockImage;
}
export function BlockImage({ block }: IBlockImageProps) {

    const { t } = useTranslation();

    const { editorMobileView } = useAppSelector(state => state.emailsApp);

    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

    const src = block.imageSrc.value === "" ? imageBlockDefault : block.imageSrc.value;

    const css = editorMobileView
        ?
        `
    .sc-image-${block.id}{
        width: ${(block as IBlockImage).widthMobilePercent.value === 100 ? "100%" : "auto"} !important;
        max-width: ${(block as IBlockImage).widthMobilePercent.value + (block as IBlockImage).widthMobilePercent.sizeSuffix} !important;
    }
    `
        :
        `
    .sc-image-${block.id}{
    }
    `;
    return (
        <Fragment>
            <style>
                {css}
            </style>
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                    <tr>
                        <td style={{ paddingRight: '0px', paddingLeft: '0px', fontSize: 0, lineHeight: 0 }} align={block.align.value}>
                            {isLoadingError &&
                                <Grid container justifyContent='center' p={1}>
                                    <Grid item>
                                        <Alert variant="outlined" color="error">
                                            <AlertTitle>{t('message.error')}</AlertTitle>
                                            <Typography variant="body1">{t('message.imageLoadingError')}</Typography>
                                        </Alert>
                                    </Grid>
                                </Grid>
                            }
                            <img onError={() => {
                                setIsLoadingError(true);
                            }}
                                onLoad={() => {
                                    setIsLoadingError(false);
                                }}
                             /*align={block.align.value} border={0}*/ src={src} alt={block.alternateText.value} title={block.alternateText.value} style={{ outline: 'none', textDecoration: 'none', clear: 'both', display: 'inline-block !important', border: 'none', height: 'auto', float: 'none', width: block.widthPercent.value + block.widthPercent.sizeSuffix, maxWidth: (block.calculatedWidthPixels * block.widthPercent.value / 100) + "px" }} width={block.calculatedWidthPixels * block.widthPercent.value / 100} className={`sc-image-${block.id}`} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
