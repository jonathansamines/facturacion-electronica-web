import React from 'react';
import { Segment } from 'semantic-ui-react';

const Segmento = (props) => (
  <Segment
    stacked
    compact
    size='large'
    color='blue'
    {...props} />
);

export default Segmento;
