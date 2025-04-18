import { IBlockButton, IBlockDivider, IBlockHeading, IBlockHtml, IBlockImage, IBlockText, IColumn, IContainer, ITemplate } from '../types';

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
            .sc-container {
                width: {{contentWidthPixels}}px !important;
            }
        
            .sc-container .sc-column {
                vertical-align: top;
            }
        
            {{columnStyles}}
        }

        @media (max-width: {{contentWidthPixelsWithPadding}}px) {
            .sc-container-parent {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }
            .sc-container .sc-column {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }
            .sc-container {
                width: 100% !important;
            }
            .sc-column {
                width: 100% !important;
            }
            .sc-column > div {
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

        @media (max-width: {{contentWidthPixelsWithPadding}}px) {
            {{imageStyles}}
            {{mobileCss}}
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
    previewEmailAddresses: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "template_preview_email_addresses"
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
    mobileCss: {
        type: "multilineText",
        rows: 8,
        value: ".mobile-hidden { display: none !important;}",
        defaultValue: "",
        active: true,
        required: true,
        label: "mobile_css"
    },
    htmlText: baseTemplateHtmlText,
    exportedText: "",
    containers: []
};

//CONTAINER to be is used as base for all types of containers in app
//remove  style="{{backgroundColor}}" from line 1 <td>
const baseContainerHtmlText = `
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><![endif]-->
    <div class="sc-container-parent" style="padding-top: {{paddingTopPixels}}{{paddingTopPixelsSuffix}};padding-bottom: {{paddingBottomPixels}}{{paddingBottomPixelsSuffix}};{{backgroundColor}}">
        <div class="sc-container" style="margin: 0 auto;min-width: 320px;max-width: {{calculatedWidthPixels}}px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;{{contentBackgroundColor}}">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-top: {{paddingTopPixels}}{{paddingTopPixelsSuffix}};padding-bottom: {{paddingBottomPixels}}{{paddingBottomPixelsSuffix}};{{backgroundColor}}" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:{{calculatedWidthPixels}}px;"><tr style="{{contentBackgroundColor}}"><![endif]-->
                    <!-- COLUMNS -->    
                    {{columns}}
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
`;
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
        typeSuffix: '%',
        label: 'columns_width'
    },
    htmlText: baseContainerHtmlText,
    exportedText: "",
    columns: []
};

//COLUMN to be used as base for all columns in app
const baseColumnHtmlText = `
<!--[if (mso)|(IE)]><td class="{{cssMobileClassNames}}" align="center" width="{{calculatedWidthPixels}}" style="{{backgroundColor}}width: {{calculatedWidthPixels}}px;padding: {{paddingTop}}{{paddingTopSuffix}} {{paddingRight}}{{paddingRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}} {{paddingLeft}}{{paddingLeftSuffix}}; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="sc-column sc-column-{{calculatedWidthPixelsToFixedString}}" style="max-width: 320px;min-width: {{calculatedWidthPixels}}px;display: table-cell;vertical-align: top;">
        <div style="{{backgroundColor}}height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div class="{{cssMobileClassNames}}" style="box-sizing: border-box; height: 100%; padding: {{paddingTop}}{{paddingTopSuffix}} {{paddingRight}}{{paddingRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}} {{paddingLeft}}{{paddingLeftSuffix}}; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
            <!-- BLOCKS -->
            {{blocks}}
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
    </div>
<!--[if (mso)|(IE)]></td><![endif]-->
`;
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
    paddingTop: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeft: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left"
    },
    paddingRight: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_right"
    },
    paddingBottom: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
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
    cssMobileClassNames: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "css_class_names_for_mobile"
    },
    htmlText: baseColumnHtmlText,
    exportedText: '',
    blocks: []
};

//BLOCKS
const blockHtmlHtmlText = `
<!-- HTML TEXT -->
<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="left">

                <div style="font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}}; {{color}} text-align: {{textAlign}}; word-wrap: break-word; line-height: {{lineHeightPixels}}px;">
                    {{html}}
                </div>

            </td>
        </tr>
    </tbody>
</table>
`;
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
    paddingTop: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockHtmlHtmlText,
    exportedText: ''
};

//removed line-height: {{lineHeightPercent}}{{lineHeightPercentSuffix}}; from <h2 style>
const blockHeadingHtmlText = `
<!-- HEADING -->
<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="left">

                <!--[if mso]><table width="100%"><tr><td><![endif]-->
                    <h2 style="margin: 0px; {{color}} text-align: {{textAlign}}; word-wrap: break-word; font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}};"><span style="line-height: {{lineHeightPixels}}px;">{{heading}}</span></h2>
                <!--[if mso]></td></tr></table><![endif]-->

            </td>
        </tr>
    </tbody>
</table>
`;
export const blockHeading: IBlockHeading = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'heading',
    heading: {
        type: "multilineText",
        rows: 3,
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
        value: 130,
        defaultValue: 130,
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
    paddingTop: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockHeadingHtmlText,
    exportedText: ''
};

//removed line-height: {{lineHeightPercent}}{{lineHeightPercentSuffix}};  from <div style
const blockTextHtmlText = `
<!-- TEXT -->
<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="left">

            <div style="font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}}; {{color}} text-align: {{textAlign}}; word-wrap: break-word;">
                <p style="line-height: {{lineHeightPixels}}px;">{{text}}</p>
            </div>

            </td>
        </tr>
    </tbody>
</table>
`;
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
        defaultValue: 130,
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
    paddingTop: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockTextHtmlText,
    exportedText: ''
};

const blockImageHtmlText = `
<!-- IMAGE -->
<table id="{{tableId}}" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="left">

                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 0px;padding-left: 0px;font-size: 0px; line-height: 0px;" align="{{align}}">
                        {{anchorStart}}<img align="{{align}}" border="0" src="{{imageSrc}}" alt="{{alternateText}}" title="{{alternateText}}" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;max-width: {{widthPercent}}{{widthPercentSuffix}};width: {{widthPixels}}px;" width="{{widthPixels}}" class="{{classMobile}}" />{{anchorEnd}}
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </tbody>
</table>
`;
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
    widthMobilePercent: {
        type: "size",
        value: 100,
        defaultValue: 100,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "%",
        active: true,
        required: true,
        label: "mobile_image_width"
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
    anchor: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "image_anchor"
    },
    target: {
        value: '_blank',
        defaultValue: '_blank',
        options: [
            { key: "_blank", label: "control_a_target_blank" },
            { key: "_self", label: "control_a_target_self" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'image_anchor_target'
    },
    paddingTop: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockImageHtmlText,
    exportedText: ''
};

const blockDividerHtmlText = `
<!-- DIVIDER -->
<table cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="left">
                
                <table height="0px" align="{{align}}" border="0" cellpadding="0" cellspacing="0" width="{{widthPercent}}{{widthPercentSuffix}}" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: {{lineWidthPixels}}{{lineWidthPixelsSuffix}} {{lineType}} {{lineColor}};-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                        <tr style="vertical-align: top">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <span>&#160;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </td>
        </tr>
    </tbody>
</table>
`;
export const blockDivider: IBlockDivider = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'divider',
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
        label: "divider_width"
    },
    lineWidthPixels: {
        type: "size",
        value: 1,
        defaultValue: 1,
        max: 20,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "line_width"
    },
    lineColor: {
        type: "color",
        value: "#000000",
        defaultValue: "#000000",
        active: true,
        required: true,
        label: "line_color"
    },
    lineType: {
        value: 'solid',
        defaultValue: 'solid',
        options: [{ key: "solid", label: "border_type_solid" }, { key: "dashed", label: "border_type_dashed" }, { key: "dotted", label: "border_type_dotted" }],
        type: 'selection',
        active: true,
        required: true,
        label: 'line_style'
    },
    align: {
        type: 'hAlign',
        value: 'center',
        defaultValue: 'center',
        active: true,
        required: true,
        label: 'align_type'
    },
    paddingTop: {
        type: "size",
        value: 5,
        defaultValue: 5,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 5,
        defaultValue: 5,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockDividerHtmlText,
    exportedText: '',
};

const blockButtonHtmlText = `
<!-- BUTTON -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tbody>
        <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}};" align="{{align}}">
                <table cellpadding="0" cellspacing="0" border="0" style="display: inline;" >
                    <tbody>
                        <tr>
                            <td style="background-color: {{backgroundColor}}; padding: {{paddingTopButton}}{{paddingTopButtonSuffix}} {{paddingLeftRightButton}}{{paddingLeftRightButtonSuffix}} {{paddingBottomButton}}{{paddingBottomButtonSuffix}}; border-radius: {{borderRadiusPixels}}{{borderRadiusPixelsSuffix}}; -webkit-border-radius: {{borderRadiusPixels}}{{borderRadiusPixelsSuffix}}; -moz-border-radius: {{borderRadiusPixels}}{{borderRadiusPixelsSuffix}}; color: {{color}}; font-family: '{{fontFamily}}'; font-weight: {{fontWeight}}; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}};">
                                <a href="{{anchor}}" target="{{target}}" style="text-decoration: none; color: {{color}}; white-space: nowrap;">
                                    {{buttonText}}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
`;
// const blockButtonHtmlTextBad = `<table cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//         <tr>
//             <td style="overflow-wrap:break-word;word-break:break-word;padding:{{paddingTop}}{{paddingTopSuffix}} {{paddingLeftRight}}{{paddingLeftRightSuffix}} {{paddingBottom}}{{paddingBottomSuffix}}" align="left">
        
//                 <!-- BUTTON -->
//                 <!--[if mso]><style>.sc-button {background: transparent !important;}</style><![endif]-->
//                     <div align="{{align}}">
//                     <!--[if mso]>
//                     <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{anchor}}" style="height:{{heightPixels}}{{heightPixelsSuffix}}; v-text-anchor:middle; width:{{widthPixels}}{{widthPixelsSuffix}};" arcsize="{{borderRadiusPercent}}%" stroke="f" fillcolor="{{backgroundColor}}"><w:anchorlock/>
//                         <center style="color:{{color}}; font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}}; font-weight: {{fontWeight}};">
//                         <![endif]-->
//                             <a href="{{anchor}}" target="{{target}}" class="sc-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center; color:{{color}}; background-color: {{backgroundColor}}; border-radius: 5px;-webkit-border-radius: 5px; -moz-border-radius: 5px; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none; font-family: '{{fontFamily}}'; font-size: {{fontSizePixels}}{{fontSizePixelsSuffix}};font-weight: {{fontWeight}};width:{{widthPixels}}{{widthPixelsSuffix}};height:{{heightPixels}}{{heightPixelsSuffix}};line-height:{{lineHeight}}{{heightPixelsSuffix}};">{{buttonText}}</a>
//                         <!--[if mso]>
//                         </center>
//                     </v:roundrect>
//                     <![endif]-->
//                     </div>
//             </td>
//         </tr>
//     </tbody>
// </table>
// `;
export const blockButton: IBlockButton = {
    calculatedWidthPixels: 0,
    id: '',
    logo: '',
    type: 'button',
    buttonText: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "button_text"
    },
    anchor: {
        type: "text",
        value: "",
        defaultValue: "",
        active: true,
        required: true,
        label: "button_anchor"
    },
    target: {
        value: '_blank',
        defaultValue: '_blank',
        options: [
            { key: "_blank", label: "control_a_target_blank" },
            { key: "_self", label: "control_a_target_self" },
        ],
        type: 'selection',
        active: true,
        required: true,
        label: 'button_anchor_target'
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
        value: 15,
        defaultValue: 15,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "font_size"
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
        value: "#ffffff",
        defaultValue: "#ffffff",
        active: true,
        required: true,
        label: "button_text_color"
    },
    backgroundColor: {
        type: "color",
        value: "#1976D2",
        defaultValue: "#1976D2",
        active: true,
        required: true,
        label: "button_background_color"
    },
    align: {
        type: 'hAlign',
        value: 'center',
        defaultValue: 'center',
        active: true,
        required: true,
        label: 'align_type'
    },
    paddingTopButton: {
        type: "size",
        value: 7,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top_button"
    },
    paddingLeftRightButton: {
        type: "size",
        value: 30,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right_button"
    },
    paddingBottomButton: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom_button"
    },
    borderRadius: {
        type: "size",
        value: 0,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "border_radius"
    },
    paddingTop: {
        type: "size",
        value: 5,
        defaultValue: 5,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_top"
    },
    paddingLeftRight: {
        type: "size",
        value: 10,
        defaultValue: 0,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_left_right"
    },
    paddingBottom: {
        type: "size",
        value: 5,
        defaultValue: 5,
        max: 100,
        min: 0,
        step: 1,
        sizeSuffix: "px",
        active: true,
        required: true,
        label: "padding_bottom"
    },
    htmlText: blockButtonHtmlText,
    exportedText: '',
};