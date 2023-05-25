import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class GraficoDeRosca implements ComponentFramework.StandardControl<IInputs, IOutputs> {

  private _container: HTMLDivElement;
  private _svg: SVGElement;
  private _circle: SVGCircleElement;
  private _backgroundCircle: SVGCircleElement; // Novo elemento para o círculo de destaque
  private _text: SVGTextElement;

  constructor() {

  }

  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
    this._container = container;

    // Criação do elemento SVG
    this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._svg.setAttribute("viewBox", "0 0 100 100");
    this._svg.style.width = "100%";
    this._svg.style.height = "100%";

    // Criação do círculo de fundo (rosquinha)
    this._backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this._backgroundCircle.setAttribute("cx", "50");
    this._backgroundCircle.setAttribute("cy", "50");
    this._backgroundCircle.setAttribute("r", "40"); // Raio maior que o círculo principal
    this._backgroundCircle.setAttribute("fill", "none"); // Cor de destaque (exemplo: #f5f5f5")
    this._backgroundCircle.setAttribute("stroke", "#f5f5f5"); // Sem contorno
    this._backgroundCircle.setAttribute("stroke-width", "10");

    // Criação do círculo principal
    this._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this._circle.setAttribute("cx", "50");
    this._circle.setAttribute("cy", "50");
    this._circle.setAttribute("r", "40");
    this._circle.setAttribute("fill", "none");
    this._circle.setAttribute("stroke", "#ddd");
    this._circle.setAttribute("stroke-width", "10");
    this._circle.setAttribute("stroke-dasharray", "251.2");
    this._circle.setAttribute("stroke-dashoffset", "251.2");

    // Criação do texto
    this._text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this._text.setAttribute("x", "50");
    this._text.setAttribute("y", "55");
    this._text.setAttribute("text-anchor", "middle");
    this._text.setAttribute("font-size", "20px");
    this._text.setAttribute("fill", "#333");

    // Adicionar elementos SVG ao contêiner
    this._svg.appendChild(this._backgroundCircle); // Adicionar o círculo de destaque primeiro
    this._svg.appendChild(this._circle);
    this._svg.appendChild(this._text);
    this._container.appendChild(this._svg);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const valor = context.parameters.Valor.raw || 0; // Obter o valor da propriedade "Valor"
    const corRosca = context.parameters.CorRosca.raw || "#000"; // Obter o valor da propriedade "CorRosca"
    const corTexto = context.parameters.CorTexto.raw || "#000"; // Obter o valor da propriedade "CorTexto"
    const contracor = context.parameters.ContraCor.raw || "#f5f5f5"; // Obter o valor da propriedade "CorTexto"

    // Calcular a porcentagem com base no valor (assumindo que o valor varia de 0 a 100)
    const porcentagem = Math.min(Math.max(valor, 0), 100);

    // Calcular o comprimento do traço do círculo de acordo com a porcentagem
    const comprimentoTraço = (251.2 * porcentagem) / 100;

    // Atualizar o atributo "stroke-dashoffset" do círculo com uma animação suave
    this._circle.style.transition = "stroke-dashoffset 0.3s ease-in-out";
    this._circle.setAttribute("stroke-dashoffset", (251.2 - comprimentoTraço).toString());

    // Atualizar a cor do círculo
    this._circle.setAttribute("stroke", corRosca);

    // Atualizar a cor do círculo de destaque
    this._backgroundCircle.setAttribute("stroke", contracor); // Alterar a cor de destaque conforme necessário

    // Atualizar a cor do texto
    this._text.setAttribute("fill", corTexto);

    // Atualizar o texto exibido dentro do gráfico
    this._text.textContent = `${porcentagem}%`;
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {

  }
}
