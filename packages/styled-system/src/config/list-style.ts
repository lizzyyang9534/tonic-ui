import system from '../core/system';

const group = 'list-style';
const config: any = {
  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true,
};

const listStyle = system(config, { group });

export default listStyle;
