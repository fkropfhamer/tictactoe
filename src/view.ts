import Model from "./model";

export default interface View {
    render(model: Model): void
}