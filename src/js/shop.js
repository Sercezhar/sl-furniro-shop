import { handleProductPrice } from './helpers/handleProductPrice';
import { dropdown } from './modules/dropdown';

handleProductPrice();
dropdown(
  '.cp-show__input',
  '.cp-show__list',
  '.cp-show__item',
  'cp-show__item--active'
);
dropdown(
  '.cp-sort__input',
  '.cp-sort__list',
  '.cp-sort__item',
  'cp-sort__item--active'
);
