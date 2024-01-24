declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module "*.png";

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export =value;
}

