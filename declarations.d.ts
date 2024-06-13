// types.d.ts
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}
declare module "*.gif" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const value: string;
  export { ReactComponent };
  export default value;
}
declare module "*.json" {
  const value: any;
  export default value;
}
