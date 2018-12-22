import { SimpleDescriptor } from '../../../model';

export default new SimpleDescriptor({
  pathPrefix: 'budget/C[0-9]/',
  titleTemplate: require('../title-template.html'),
  preTitleTemplate: require('./pretitle-template.html'),
  amountTemplate: require('../amount-template.html'),
  subtitleTemplate: require('./subtitle-template.html'),
  textTemplate: require('./text-template.html') + require('../text-template.html'),
  questions: require('../questions.json')
});
