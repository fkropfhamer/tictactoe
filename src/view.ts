import Model from "./model";

export default interface View {
    render(model: Model): void
    addClickEventListener(fn: (i: number, j: number) => void): void
}