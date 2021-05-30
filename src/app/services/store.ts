import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { QuestionsManager } from '../components/questions/questions-manager';

import { Item, PreparedQuestion, PreparedQuestions, DescriptorBase } from '../model';
import { BudgetKeyItemService } from './budgetkey-item';

class Store {
  item = new Item();
  descriptor = new DescriptorBase('', '', []);
}

// Global state storage

@Injectable()
export class StoreService {

  private store = new Store();

  itemChange = new EventEmitter<Item>();
  descriptorChange = new EventEmitter<DescriptorBase>();
  questions: QuestionsManager;

  private static processItem(item: Item): Item {
    return <Item>_.mapKeys(item, (value: any, key: string, obj: any) => {
      return key.replace(/-/g, '_');
    });
  }


  constructor(private itemService: BudgetKeyItemService) {
    this.questions = new QuestionsManager(this, itemService);
  }

  get item(): Item {
    return this.store.item;
  }

  set item(value: Item) {
    this.store.item = StoreService.processItem(value);
    this.itemChange.emit(this.store.item);
  }

  get descriptor(): DescriptorBase {
    return this.store.descriptor;
  }

  set descriptor(value: DescriptorBase) {
    this.store.descriptor = value;
    this.questions.preparedQuestions = this.questions.parseQuestions(
      this.descriptor.questions,
      this.store.item
    );
    this.descriptorChange.emit(this.store.descriptor);
  }

}
