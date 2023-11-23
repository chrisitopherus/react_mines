import { Dispatch, SetStateAction } from "react";

export interface FieldStateControllerConfiguration {
    helperState: boolean,
    setHelperState: Dispatch<SetStateAction<boolean>>
}

export class FieldStateController {
    constructor(private configuration: FieldStateControllerConfiguration) { }

    triggerNewFieldGeneration() {
        this.configuration.setHelperState(!this.configuration.helperState);
    }
}