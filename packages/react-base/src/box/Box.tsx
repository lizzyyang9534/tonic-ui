import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { pseudoClassSelector, pseudoElementSelector, sx, system } from '@tonic-ui/styled-system';
import { ensureArray, ensurePlainObject } from 'ensure-type';
import type { HTMLAttributes } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  sx?: Record<string, any>;
  [key: string]: any;
}

const shouldForwardProp = (() => {
  const stylePropMap: Record<string, boolean> = ensureArray(system.propNames).reduce(
    (acc: Record<string, boolean>, val: any) => {
      acc[String(val)] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );
  const omittedStylePropMap: Record<string, boolean> = {
    ...stylePropMap,

    // The `as` prop is supported by Emotion
    'as': true,
  };

  return (prop: string) => isPropValid(prop) && !omittedStylePropMap[prop];
})();

const transformCSSPseudoSelectors = (props: Record<string, any>) => {
  const entries = Object.entries(ensurePlainObject(props))
    .filter(([name]) => {
      return Object.prototype.hasOwnProperty.call(pseudoClassSelector, name) ||
        Object.prototype.hasOwnProperty.call(pseudoElementSelector, name);
    });

  return sx(Object.fromEntries(entries));
};

const transformCSSSuperset = (props?: { sx?: any }) => {
  // The `sx` prop is a shortcut for defining custom styles that has access to the theme
  return sx(props?.sx);
};

const Box = styled('div', { shouldForwardProp })(
  system,
  transformCSSPseudoSelectors,
  transformCSSSuperset,
  // Prioritize highest specificity by placing it at the end
);

Box.displayName = 'Box';

export default Box;
