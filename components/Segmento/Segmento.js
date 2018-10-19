import React from 'react';
import { Segment } from 'semantic-ui-react';

const Segmento = (props) => (
  <Segment
    stacked
    compact
    size='large'
    color='red'
    {...props} />
);

export default Segmento;
