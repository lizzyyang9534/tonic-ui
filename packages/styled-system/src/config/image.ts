import system from '../core/system';

const group = 'image';
const config: any = {
  imageOrientation: true,
  imageRendering: true,
};

const image = system(config, { group });

export default image;
