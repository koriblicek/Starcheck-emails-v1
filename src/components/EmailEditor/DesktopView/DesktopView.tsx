import { Box } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { DesktopItemContainer } from "./DesktopItemContainer";
import { useDispatch } from "react-redux";
import { emailsCurrentEmailActions } from "../../../store/debuilder-data/emailsCurrentEmailSlice";
import transparency_background from "../../../assets/images/transparency_background.png";

export function DesktopView() {

    const dispatch = useDispatch();

    const { template } = useAppSelector(state => state.emailsCurrentEmail);

    if (!template)
        return null;

    //all containers
    const css = `
            .u-row {
            width: ${template.contentWidthPixels.value + template.contentWidthPixels.sizeSuffix} !important;
            }

            .u-row .u-col {
            vertical-align: top;
            }

            .u-row .u-col-100 {
            width: ${template.contentWidthPixels.value + template.contentWidthPixels.sizeSuffix} !important;
            }
        }
`;
    return (
        <Box sx={{ margin: '0px', padding: '30px', background: `url(${transparency_background})` }}
            onClick={() => dispatch(emailsCurrentEmailActions.clearSelection())}
        >
            <Box sx={{ margin: '0px', padding: '0px', backgroundColor: template.backgroundColor.value, color: template.textColor.value }}>
                <style>
                    {css}
                </style>
                <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0, verticalAlign: 'top', minWidth: '320px', margin: '0 auto', backgroundColor: template.backgroundColor.value, width: template.contentWidthPixels.value + template.contentWidthPixels.sizeSuffix }}>
                    <tbody>
                        <tr style={{ verticalAlign: 'top' }}>
                            <td style={{ borderCollapse: 'collapse', verticalAlign: 'top' }}>
                                {/* if no items in container */}
                                {template.containers.length === 0
                                    ?
                                    <DesktopItemContainer />
                                    :
                                    <>todo</>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Box>
    );

}
