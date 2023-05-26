import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class ExcelExport implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private link: HTMLAnchorElement;
	private svg: SVGElement;
	private filename:string;
	private _notifyOutputChanged: () => void;
	private printable:string;
	private testss:JSON;
	
	constructor() {}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this.link = document.createElement("a");
		this.link.classList.add("excel-download-link");
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.svg.classList.add("excel-icon");
		this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		this.svg.setAttribute("viewBox", "0 0 384 512");
		this.svg.innerHTML = '<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z"></path>';
		this.link.appendChild(this.svg);
		this.link.addEventListener("click", this.onLinkClick.bind(this));
		container.appendChild(this.link);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		
		if(context.parameters.DataToExport.raw)
		{
			this.printable = context.parameters.DataToExport.raw;
		}
		if( context.parameters.FileName.raw)
		{
		this.filename = context.parameters.FileName.raw+".xlsx";
		}
		const containerWidth = context.mode.allocatedWidth;
		const containerHeight = context.mode.allocatedHeight;
		const hex = context.parameters.IconColor.raw || "#000";
		this.svg.style.fill = `${hex}`;
		this.svg.style.width = `${Math.max(containerWidth, containerHeight)}px`;
		this.svg.style.height = `${Math.max(containerWidth, containerHeight)}px`;
	}

	private onLinkClick(event: Event): void {
		var testss = JSON.parse(this.printable);
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(testss);
		const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
		XLSX.writeFile(workbook,this.filename);
	} 	

	public getOutputs(): IOutputs {
		return {};
	}

	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}