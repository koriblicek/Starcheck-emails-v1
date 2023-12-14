import { IBlockButton } from '../../../../../types';
import { useTranslation } from 'react-i18next';

export interface IBlockButtonProps {
    block: IBlockButton;
}

export function BlockButton({ block }: IBlockButtonProps) {

    const { t } = useTranslation();

    return (
        <table width='100%' cellPadding={0} cellSpacing={0} border={0} >
            <tbody>
                <tr>
                    <td style={{ paddingRight: '0px', paddingLeft: '0px' }} align={block.align.value}>
                        <a href={block.anchor.value} target={block.target.value} style={{
                            pointerEvents: 'none',
                            boxSizing: 'border-box', display: 'inline-block', textDecoration: 'none', WebkitTextSizeAdjust: 'none',
                            textAlign: 'center', ...(block.color.value !== "transparent" ? { color: block.color.value } : {}), ...(block.backgroundColor.value !== "transparent" ? { backgroundColor: block.backgroundColor.value } : {}),lineHeight:block.heightPixels.value+block.heightPixels.sizeSuffix,
                            borderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix, WebkitBorderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix, MozBorderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix, height: block.heightPixels.value+block.heightPixels.sizeSuffix,
                            width: block.widthPixels.value+block.widthPixels.sizeSuffix, maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word', wordWrap: 'break-word',
                            fontFamily: `${block.fontFamily.value}`, fontWeight: block.fontWeight.value, fontSize: block.fontSizePixels.value + block.fontSizePixels.sizeSuffix
                        }}>{block.buttonText.value !== "" ? block.buttonText.value : t('message.yourButtonTextHere')}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    );
    /*
        return (
            <div style={{ textAlign: block.align.value }}>
                <a href={block.anchor.value} target={block.target.value} style={{
                    pointerEvents: 'none',
                    boxSizing: 'border-box', display: 'inline-block', textDecoration: 'none', WebkitTextSizeAdjust: 'none',
                    textAlign: 'center', ...(block.color.value !== "transparent" ? { color: block.color.value } : {}), ...(block.backgroundColor.value !== "transparent" ? { backgroundColor: block.backgroundColor.value } : {}),
                    borderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix, WebkitBorderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix, MozBorderRadius: block.borderRadius.value + block.borderRadius.sizeSuffix,
                    width: 'auto', maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word', wordWrap: 'break-word',
                    border: block.borderWidthPixels.value + block.borderWidthPixels.sizeSuffix + " " + block.borderType.value + " " + block.borderColor.value,
                    fontFamily: block.fontFamily.value, fontWeight: block.fontWeight.value, fontSize: block.fontSizePixels.value + block.fontSizePixels.sizeSuffix
                }}>
                    <span style={{ display: 'block', padding: block.paddingVertical.value + block.paddingVertical.sizeSuffix + " " + block.paddingHorizontal.value + block.paddingHorizontal.sizeSuffix, lineHeight: block.lineHeightPercent.value + block.lineHeightPercent.sizeSuffix }}>{block.buttonText.value !== "" ? block.buttonText.value : t('message.yourButtonTextHere')}</span>
                </a>
            </div >
    
        );
        */
}
