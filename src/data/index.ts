import { IBlockHeading, IBlockHtml, IBlockImage, IBlockText, IColumn, IContainer, ITemplate } from '../types';

//MAIN email template
const baseTemplateHtmlText = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title>{{subjectLine}}</title>
    <style type="text/css">
        @media (min-width: {{contentWidthPixelsWithPadding}}px) {
            .u-row {
                width: {{contentWidthPixels}}px !important;
            }
        
            .u-row .u-col {
                vertical-align: top;
            }
        
            {{columnStyles}}
        }

        @media (max-width: {{contentWidthPixelsWithPadding}}px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }
            .u-row {
                width: 100% !important;
            }
            .u-col {
                width: 100% !important;
            }
            .u-col > div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        p {
            margin: 0;
        }

        table, tr, td {
            vertical-align: top;
            border-collapse: collapse;
            {{textColor}}
        }

        .ie-container table, .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>
</head>
<body style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;{{backgroundColor}}{{textColor}}">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;margin: 0 auto;{{backgroundColor}}width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <!-- PREVIEW LINE 1 -->
        <tr>
            <td style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            {{previewLine1}}
            </td>
        </tr>
        <!-- PREVIEW LINE 2 -->
        <tr>
            <td style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            {{previewLine2}}
            </td>
        </tr>
        <!-- CONTAINERS -->
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                {{containers}}
            </td>
        </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>
</html>`;
export const emptyTemplate: ITemplate = {
    id: '',
    modificationDate: 0,
    name: {
        type: "text",
        value: "Empty template",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_name"
    },
    backgroundColor: {
        type: "color",
        value: "transparent",
        defaultValue: "#ffffff",
        active: true,
        required: true,
        label: "background_color"
    },
    textColor: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "text_color"
    },
    contentWidthPixels: {
        type: "size",
        value: 600,
        defaultValue: 650,
        max: 800,
        min: 400,
        step: 10,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "content_width"
    },
    subjectLine: {
        type: "text",
        value: "subject line",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_subject_line"
    },
    previewLine1: {
        type: "text",
        value: "preview line 1",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_preview_line_1"
    },
    previewLine2: {
        type: "text",
        value: "preview line 2",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_preview_line_2"
    },
    htmlText: baseTemplateHtmlText,
    exportedText: "",
    containers: []
};

//CONTAINER to be is used as base for all types of containers in app
//remove  style="{{backgroundColor}}" from line 1 <td>
const baseContainerHtmlText = `<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><![endif]-->
    <div class="u-row-container" style="padding-top: {{paddingTopPixels}}{{paddingTopPixelsSuffix}};padding-bottom: {{paddingBottomPixels}}{{paddingBottomPixelsSuffix}};{{backgroundColor}}">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: {{calculatedWidthPixels}}px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;{{contentBackgroundColor}}">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-top: {{paddingTopPixels}}{{paddingTopPixelsSuffix}};padding-bottom: {{paddingBottomPixels}}{{paddingBottomPixelsSuffix}};{{backgroundColor}}" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:{{calculatedWidthPixels}}px;"><tr style="{{contentBackgroundColor}}"><![endif]-->
                    <!-- COLUMNS -->    
                    {{columns}}
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->`;
export const baseContainer: IContainer = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    backgroundColor: {
        type: "color",
        value: "transparent",
        defaultValue: "#ffffff",
        active: true,
        required: true,
        label: "background_color"
    },
    contentBackgroundColor: {
        type: "color",
        value: "transparent",
        defaultValue: "#ffffff",
        active: true,
        required: true,
        label: "content_background_color"
    },
    paddingTopPixels: {
        type: "size",
        value: 0,
        defaultValue: 10,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingBottomPixels: {
        type: "size",
        value: 0,
        defaultValue: 10,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    columnsWidthsPercents: {
        type: 'numberArray',
        value: [],
        defaultValue: [],
        min: 0,
        max: 100,
        step: 1,
        active: true,
        required: true,
        label: 'columns_width'
    },
    htmlText: baseContainerHtmlText,
    exportedText: "",
    columns: []
};

//COLUMN to be used as base for all columns in app
const baseColumnHtmlText = `
<!--[if (mso)|(IE)]><td align="center" width="{{calculatedWidthPixels}}" style="{{backgroundColor}}width: {{calculatedWidthPixels}}px;padding: {{padding}}{{paddingSuffix}};border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-{{calculatedWidthPixelsToFixedString}}" style="max-width: 320px;min-width: {{calculatedWidthPixels}}px;display: table-cell;vertical-align: top;">
        <div style="{{backgroundColor}}height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: {{padding}}{{paddingSuffix}}; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
            <!-- BLOCKS -->
            {{blocks}}
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
    </div>
<!--[if (mso)|(IE)]></td><![endif]-->
`;
// const baseColumnHtmlText = `
// <!--[if (mso)|(IE)]><td align="center" width="{{calculatedWidthPixels}}" style="{{backgroundColor}}width: {{calculatedWidthPixels}}px;padding: {{padding}}{{paddingSuffix}};border: {{borderWidthPixels}}{{borderWidthPixelsSuffix}} {{borderType}} {{borderColor}};border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//     <div class="u-col u-col-{{calculatedWidthPixelsToFixedString}}" style="max-width: 320px;min-width: {{calculatedWidthPixels}}px;display: table-cell;vertical-align: top;">
//         <div style="{{backgroundColor}}height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//         <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: {{padding}}{{paddingSuffix}};border: {{borderWidthPixels}}{{borderWidthPixelsSuffix}} {{borderType}} {{borderColor}}; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
//             <!-- BLOCKS -->
//             {{blocks}}
//         <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//         </div>
//     </div>
// <!--[if (mso)|(IE)]></td><![endif]-->
// `;
export const baseColumn: IColumn = {
    calculatedWidthPixels: 0,
    id: '',
    widthPixels: 0,
    backgroundColor: {
        type: "color",
        value: "transparent",
        defaultValue: "#ffffff",
        active: true,
        required: true,
        label: "background_color"
    },
    padding: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    borderWidthPixels: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 10,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "border_width"
    },
    borderColor: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "border_color"
    },
    borderType: {
        value: 'solid',
        defaultValue: 'solid',
        options: [{ key: "solid", label: "border_type_solid" }, { key: "dashed", label: "border_type_dashed" }, { key: "dotted", label: "border_type_dotted" }],
        type: 'selection',
        active: true,
        required: true,
        label: 'border_style'
    },
    htmlText: baseColumnHtmlText,
    exportedText: '',
    blocks: []
};

//BLOCKS

const blockHtmlHtmlText = `<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{padding}}{{paddingSuffix}}" align="left">

            <!-- TEXT -->
            <div style="font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}}; {{color}} text-align: {{textAlign}}; word-wrap: break-word;">
                {{html}}
            </div>

            </td>
        </tr>
    </tbody>
</table>`;
export const blockHtml: IBlockHtml = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'html',
    html: {
        type: "multilineText",
        rows: 4,
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "html_code"
    },
    fontFamily: {
        type: "text",
        value: "Segoe UI",
        defaultValue: "Segoe UI",
        active: true,
        required: true,
        label: "font_family"
    },
    fontSizePixels: {
        type: "size",
        value: 12,
        defaultValue: 12,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
    },
    fontWeight: {
        value: 'normal',
        defaultValue: 'normal',
        options: [
            { key: "normal", label: "control_font_weight_normal" },
            { key: "bold", label: "control_font_weight_bold" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'font_weight'
    },
    color: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "text_color"
    },
    textAlign: {
        value: 'left',
        defaultValue: 'left',
        type: 'tAlign',
        active: true,
        required: true,
        label: 'text_align'
    },
    padding: {
        type: "size",
        value: 2,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    htmlText: blockHtmlHtmlText,
    exportedText: ''
};

const blockHeadingHtmlText = `<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{padding}}{{paddingSuffix}}" align="left">

            <!-- HEADING -->
            <!--[if mso]><table width="100%"><tr><td><![endif]-->
                <h2 style="margin: 0px; {{color}} line-height: {{lineHeightPercent}}{{lineHeightPercentSuffix}}; text-align: {{textAlign}}; word-wrap: break-word; font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}};"><span style="line-height: {{lineHeightPixels}}px;">{{heading}}</span></h2>
            <!--[if mso]></td></tr></table><![endif]-->

            </td>
        </tr>
    </tbody>
</table>`;
export const blockHeading: IBlockHeading = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'heading',
    heading: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "heading"
    },
    fontFamily: {
        type: "text",
        value: "Segoe UI",
        defaultValue: "Segoe UI",
        active: true,
        required: true,
        label: "font_family"
    },
    fontSizePixels: {
        type: "size",
        value: 20,
        defaultValue: 20,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
    },
    lineHeightPercent: {
        type: "size",
        value: 100,
        defaultValue: 100,
        max: 1000,
        min: 0,
        step: 10,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "line_height"
    },
    fontWeight: {
        value: 'bold',
        defaultValue: 'bold',
        options: [
            { key: "normal", label: "control_font_weight_normal" },
            { key: "bold", label: "control_font_weight_bold" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'font_weight'
    },
    color: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "text_color"
    },
    textAlign: {
        value: 'left',
        defaultValue: 'left',
        type: 'tAlign',
        active: true,
        required: true,
        label: 'text_align'
    },
    padding: {
        type: "size",
        value: 2,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    htmlText: blockHeadingHtmlText,
    exportedText: ''
};

const blockTextHtmlText = `<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{padding}}{{paddingSuffix}}" align="left">

            <!-- TEXT -->
            <div style="font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}}; {{color}} line-height: {{lineHeightPercent}}{{lineHeightPercentSuffix}}; text-align: {{textAlign}}; word-wrap: break-word;">
                <p style="line-height: {{lineHeightPixels}}px;">{{text}}</p>
            </div>

            </td>
        </tr>
    </tbody>
</table>`;
export const blockText: IBlockText = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'text',
    text: {
        type: "multilineText",
        rows: 3,
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "text"
    },
    fontFamily: {
        type: "text",
        value: "Segoe UI",
        defaultValue: "Segoe UI",
        active: true,
        required: true,
        label: "font_family"
    },
    fontSizePixels: {
        type: "size",
        value: 12,
        defaultValue: 12,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
    },
    lineHeightPercent: {
        type: "size",
        value: 130,
        defaultValue: 100,
        max: 1000,
        min: 0,
        step: 10,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "line_height"
    },
    fontWeight: {
        value: 'normal',
        defaultValue: 'normal',
        options: [
            { key: "normal", label: "control_font_weight_normal" },
            { key: "bold", label: "control_font_weight_bold" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'font_weight'
    },
    color: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "text_color"
    },
    textAlign: {
        value: 'left',
        defaultValue: 'left',
        type: 'tAlign',
        active: true,
        required: true,
        label: 'text_align'
    },
    padding: {
        type: "size",
        value: 2,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    htmlText: blockTextHtmlText,
    exportedText: ''
};

const blockImageHtmlText = `<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{padding}}{{paddingSuffix}}" align="left">

                <!-- IMAGE -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 0px;padding-left: 0px;font-size: 0px;" align="{{align}}">
                            <img align="{{align}}" border="0" src="{{imageSrc}}" alt="{{alternateText}}" title="{{alternateText}}" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: {{widthPercent}}{{widthPercentSuffix}};max-width: {{widthPixels}}px;" width="{{widthPixels}}" />
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </tbody>
</table>`;
export const blockImage: IBlockImage = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'image',
    imageSrc: {
        type: "image",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "image_source_url"
    },
    widthPercent: {
        type: "size",
        value: 100,
        defaultValue: 100,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "image_width"
    },
    align: {
        value: 'center',
        defaultValue: 'center',
        type: 'hAlign',
        active: true,
        required: true,
        label: 'align_type'
    },
    alternateText: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "image_alternate_text"
    },
    padding: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding"
    },
    htmlText: blockImageHtmlText,
    exportedText: ''
};
