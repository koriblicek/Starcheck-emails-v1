import { Fragment } from "react";
import { IBlockHtml } from "../../../../../types";
import { emailsCurrentEmailActions } from "../../../../../store/emails-data/emailsCurrentEmailSlice";
import { useDispatch } from "react-redux";
import { SafeHtmlEditor } from './SafeHtmlEditor';

interface IHtmlBlockProps {
    block: IBlockHtml;
}
export function HtmlBlock({ block }: IHtmlBlockProps) {

    const dispatch = useDispatch();

    function updateKey(propertyKey: string, value: string) {
        dispatch(emailsCurrentEmailActions.updateBlockProperty({ blockId: block.id, propertyKey: propertyKey, value }));
    }

    return (
        <Fragment>
            <SafeHtmlEditor html={block.html.value} onChange={(value) => updateKey('html', value)} />
        </Fragment>
    );
}
