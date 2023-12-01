import { useAppSelector } from "../../../store/hooks";
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
        return <ContainerPanel container={selectedContainer} key={selectedContainer.id} />;
    } else {
        if (selectedBlock) {
            //block is selected
            return <>block</>;
        } else {
            //template is selected
            return <TemplatePanel template={template} key={template.id} />;
        }
    }
}