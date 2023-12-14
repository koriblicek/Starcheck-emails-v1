import { useTranslation } from 'react-i18next';
import { IBlockHtml } from '../../../../../types';

interface IBlockHtmlProps {
    block: IBlockHtml;
}
export function BlockHtml({ block }: IBlockHtmlProps) {

    const { t } = useTranslation();

    return (
        <div dangerouslySetInnerHTML={{ __html: block.html.value !== "" ? block.html.value : t('message.yourHtmlHere') }} style={{ fontFamily: block.fontFamily.value, fontWeight: block.fontWeight.value, ...(block.color.value !== "transparent" ? { color: block.color.value } : {}), fontSize: block.fontSizePixels.value + block.fontSizePixels.sizeSuffix, textAlign: block.textAlign.value, wordWrap: 'break-word', lineHeight: `${block.lineHeightPercent.value}%` }}>
        </div>

    );
}
