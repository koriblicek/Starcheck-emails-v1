import { useAppSelector } from "../../../store/hooks";
import { BlockPanel } from "./BlockPanel";
import { ContainerPanel } from "./ContainerPanel";
import { TemplatePanel } from "./TemplatePanel";

export function SideBar() {
    const { template, selectedContainer, selectedBlock } = useAppSelector(state => state.emailsCurrentEmail);

    //return nul if no template is selected
    if (!template) {
        return null;
    }

    if (selectedContainer) {
        //container is selected
        return <ContainerPanel container={selectedContainer} />;
    } else {
        if (selectedBlock) {
            //block is selected
            return <BlockPanel block={selectedBlock} />;
        } else {
            //template is selected
            return <TemplatePanel template={template} key={template.id} />;
        }
    }
}
