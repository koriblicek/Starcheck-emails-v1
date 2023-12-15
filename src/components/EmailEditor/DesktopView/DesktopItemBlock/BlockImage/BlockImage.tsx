import { IBlockImage } from '../../../../../types';
import imageBlockDefault from '../../../../../assets/images/image-block-default.png';
import { Fragment } from 'react';
import { useAppSelector } from '../../../../../store/hooks';

interface IBlockImageProps {
    block: IBlockImage;
}
export function BlockImage({ block }: IBlockImageProps) {
    const { editorMobileView } = useAppSelector(state => state.emailsApp)
    const src = block.imageSrc.value === "" ? imageBlockDefault : block.imageSrc.value;
    console.log(1)
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
    `
    return (
        <Fragment>
            <style>
                {css}
            </style>
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                    <tr>
                        <td style={{ paddingRight: '0px', paddingLeft: '0px', fontSize: 0 }} align={block.align.value}>
                            <img /*align={block.align.value} border={0}*/ src={src} alt={block.alternateText.value} title={block.alternateText.value} style={{ outline: 'none', textDecoration: 'none', clear: 'both', display: 'inline-block !important', border: 'none', height: 'auto', float: 'none', width: block.widthPercent.value + block.widthPercent.sizeSuffix, maxWidth: (block.calculatedWidthPixels * block.widthPercent.value / 100) + "px" }} width={block.calculatedWidthPixels * block.widthPercent.value / 100} className={`sc-image-${block.id}`} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
