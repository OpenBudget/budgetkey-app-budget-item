'use strict';

import descriptorOrgAssociation from './org/association';
import descriptorOrgCompany from './org/company';
import descriptorOrgMunicipality from './org/municipality';
import descriptorOrg from './org';
import descriptorBudgetFunc from './budget/budgetFunc';
import descriptorBudgetFuncDetail from './budget/budgetFuncDetail';
import descriptorBudget2Dig from './budget/budget2dig';
import descriptorBudget4Dig from './budget/budget4dig';
import descriptorBudget6Dig from './budget/budget6dig';
import descriptorBudget8Dig from './budget/budget8dig';
import descriptorTendersExemptions from './tenders/exemptions';
import descriptorContractSpending from './contract-spending';
import descriptorBudgetChanges from './budget-changes';
import descriptorSupports from './supports';
import {Descriptor} from '../model/descriptor';

let descriptors: Descriptor[] = [
  descriptorOrgAssociation,
  descriptorOrgCompany,
  descriptorOrgMunicipality,
  descriptorOrg,
  descriptorBudgetFunc,
  descriptorBudgetFuncDetail,
  descriptorBudget2Dig,
  descriptorBudget4Dig,
  descriptorBudget6Dig,
  descriptorBudget8Dig,
  descriptorTendersExemptions,
  descriptorContractSpending,
  descriptorBudgetChanges,
  descriptorSupports,
];

export default descriptors;
