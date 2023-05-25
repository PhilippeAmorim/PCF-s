/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Valor: ComponentFramework.PropertyTypes.DecimalNumberProperty;
    CorRosca: ComponentFramework.PropertyTypes.StringProperty;
    ContraCor: ComponentFramework.PropertyTypes.StringProperty;
    CorTexto: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    Valor?: number;
    CorRosca?: string;
    ContraCor?: string;
    CorTexto?: string;
}
