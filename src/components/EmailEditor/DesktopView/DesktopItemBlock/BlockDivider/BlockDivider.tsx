import { IBlockDivider } from '../../../../../types';

export interface IBlockDividerProps {
    block: IBlockDivider;
}

export function BlockDivider({ block }: IBlockDividerProps) {
    return (

        <table align={block.align.value} border={0} cellPadding="0" cellSpacing="0" width={block.widthPercent.value + block.widthPercent.sizeSuffix} style={{ height: '0px', borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0, verticalAlign: 'top', borderTop: block.lineWidthPixels.value + block.lineWidthPixels.sizeSuffix + " " + block.lineType.value + " " + block.lineColor.value, WebkitTextSizeAdjust: '100%' }}>
            <tbody>
                <tr style={{ verticalAlign: 'top' }}>
                    <td style={{ wordBreak: 'break-word', borderCollapse: 'collapse', verticalAlign: 'top', fontSize: '0px', lineHeight: '0px', WebkitTextSizeAdjust: '100%' }}>
                        <span>&#160,</span>
                    </td>
                </tr>
            </tbody>
        </table>

    );
}
