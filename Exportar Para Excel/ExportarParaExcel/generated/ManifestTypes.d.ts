/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    DataToExport: ComponentFramework.PropertyTypes.StringProperty;
    IconColor: ComponentFramework.PropertyTypes.StringProperty;
    FileName: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    DataToExport?: string;
    IconColor?: string;
    FileName?: string;
}
