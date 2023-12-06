import { useTranslation } from 'react-i18next';
import { IBlockText } from '../../../../../types';

interface IBlockTextProps {
    block: IBlockText;
}
export function BlockText({ block }: IBlockTextProps) {

    const { t } = useTranslation();

    return (
        <div style={{ fontFamily: block.fontFamily.value, fontWeight: block.fontWeight.value, ...(block.color.value !== "transparent" ? { color: block.color.value } : {}), fontSize: block.fontSizePixels.value + block.fontSizePixels.sizeSuffix, lineHeight: block.lineHeightPercent.value + block.lineHeightPercent.sizeSuffix, textAlign: block.textAlign.value, wordWrap: 'break-word' }}>
            <p style={{ lineHeight: block.lineHeightPercent.value + block.lineHeightPercent.sizeSuffix }}>{block.text.value !== "" ? block.text.value : t('message.yourTextHere')}</p>
        </div>

    );
}
