/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    Valor: ComponentFramework.PropertyTypes.DecimalNumberProperty;
    EspessuraRosca: ComponentFramework.PropertyTypes.DecimalNumberProperty;
    CorRosca: ComponentFramework.PropertyTypes.StringProperty;
    ContraCor: ComponentFramework.PropertyTypes.StringProperty;
    CorTexto: ComponentFramework.PropertyTypes.StringProperty;
    TamanhoTexto: ComponentFramework.PropertyTypes.DecimalNumberProperty;
    EspessuraTexto: ComponentFramework.PropertyTypes.EnumProperty<"Negrito" | "Seminegrito" | "Normal" | "Mais Clara">;
}
export interface IOutputs {
    Valor?: number;
    EspessuraRosca?: number;
    CorRosca?: string;
    ContraCor?: string;
    CorTexto?: string;
    TamanhoTexto?: number;
    EspessuraTexto?: string;
}
