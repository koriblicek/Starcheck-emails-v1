import { useTranslation } from 'react-i18next';
import { IBlockHeading } from '../../../../../types';

interface IBlockHeadingProps {
    block: IBlockHeading;
}
export function BlockHeading({ block }: IBlockHeadingProps) {

    const { t } = useTranslation();

    return (
        <h2 style={{ margin: '0px', color: block.color.value, lineHeight: block.lineHeightPercent.value + block.lineHeightPercent.sizeSuffix, textAlign: block.textAlign.value, wordWrap: 'break-word', fontFamily: block.fontFamily.value, fontSize: block.fontSizePixels.value + block.fontSizePixels.sizeSuffix, fontWeight: block.fontWeight.value }}>
            <span style={{ lineHeight: block.lineHeightPercent.value + block.lineHeightPercent.sizeSuffix }}>
                {block.heading.value !== "" ? block.heading.value : t('message.yourHeadingHere')}
            </span>
        </h2>
    );
}
