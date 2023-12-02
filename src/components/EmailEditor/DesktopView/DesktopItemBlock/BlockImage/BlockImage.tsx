import { IBlockImage } from '../../../../../types';
import imageBlockDefault from '../../../../../assets/images/image-block-default.png';

interface IBlockImageProps {
    block: IBlockImage;
}
export function BlockImage({ block }: IBlockImageProps) {
    const src = block.imageSrc.value === "" ? imageBlockDefault : block.imageSrc.value;
    return (
        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
            <tbody>
                <tr>
                    <td style={{ paddingRight: '0px', paddingLeft: '0px' }} align={block.align.value as "center" | "left" | "right"}>
                        <img /*align={block.align.value} border={0}*/ src={src} alt={block.alternateText.value} title={block.alternateText.value} style={{ outline: 'none', textDecoration: 'none', clear: 'both', display: 'inline-block !important', border: 'none', height: 'auto', float: 'none', width: block.widthPercent.value + block.widthPercent.sizeSuffix, maxWidth: (block.calculatedWidthPixels * block.widthPercent.value / 100) + "px" }} width={block.calculatedWidthPixels * block.widthPercent.value / 100} />
                    </td>
                </tr>
            </tbody>
        </table>

    );
}
