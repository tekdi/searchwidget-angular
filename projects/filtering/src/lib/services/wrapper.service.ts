import { Injectable } from '@angular/core';
import {
  ServiceFunctionCardProps,
  FilterDataExtractProps,
  RenderContentProps,
  UpdateConfigProps,
} from '../models/serviceFunctionInterfaces';

@Injectable({
  providedIn: 'root',
})
export class WrapperService {
  constructor() {}
  updateConfig({
    apiData,
    addtionalFilterConfig,
    filterConfig,
  }: UpdateConfigProps) {
    let tempData = apiData;
    if (filterConfig?.length !== 0) {
      filterConfig?.map((item) => {
        const itemName = item.name;
        const itemField = item.field;
        const itemIsEnabled =
          item.isEnabled !== undefined ? item.isEnabled : true;
        tempData[0].data.PrimaryFields[itemName] = {
          field: itemField,
          isEnabled: itemIsEnabled,
        };
      });
    }
    if (addtionalFilterConfig?.length !== 0) {
      addtionalFilterConfig?.map((item: any) => {
        const itemName = item.name;
        const itemField = item.field;
        const itemIsEnabled =
          item.isEnabled !== undefined ? item.isEnabled : true;
        tempData[0].data.additionalFields[itemName] = {
          displayName: itemName,
          field: itemField,
          isEnabled: itemIsEnabled,
        };
      });
    }
    // setFilterConfig(tempData);
    return tempData;
  }

  isEnabled(filterConfig: any, itemName: string) {
    let isEnable = true;
    const keys = Object.keys(filterConfig);
    keys.map((item) => {
      if (item.toLowerCase() === itemName.toLowerCase()) {
        isEnable = filterConfig[item].isEnabled;
      }
    });
    return isEnable;
  }

  filterDataExtract({
    content,
    filterConfig,
    termsObject,
  }: FilterDataExtractProps) {
    const addtionalFieldsObject = filterConfig[0]?.data.additionalFields;

    const FilterConfigObject = {
      ...addtionalFieldsObject,
    };
    let optionNameArray: any = [];
    let optionValueArray: any = [];
    if (filterConfig.length !== 0) {
      const AddtionalKeys = Object.keys(filterConfig[0]?.data.additionalFields);
      optionNameArray = [...AddtionalKeys];
      optionNameArray?.map((item: any) => {
        if (this.isEnabled(FilterConfigObject, item)) {
          let temp: any;
          if (termsObject.hasOwnProperty(item)) {
            temp = termsObject[item];
          } else {
            let fieldName = addtionalFieldsObject[item]?.field;

            temp = new Set('');

            if (fieldName !== null || fieldName !== undefined) {
              content.map((item: any) => {
                if (item[fieldName] !== null || item[fieldName] !== undefined) {
                  if (Array.isArray(item[fieldName])) {
                    item[fieldName].map((ele: string) => {
                      temp.add(ele);
                    });
                  } else {
                    temp.add(item[fieldName]);
                  }
                }
              });
            }
          }
          if (Array.isArray(temp)) {
            console.log('temp', temp.sort());

            if (temp.length !== 0)
              optionValueArray.push({
                name: item,
                terms: temp.sort(),
              });
          } else {
            const val = Array.from(temp);
            val.splice(val.length - 1, 1);
            if (val.length !== 0)
              optionValueArray.push({
                name: item,
                terms: val.sort(),
              });
          }
        }
      });
    }
    return {
      optionNameArray,
      optionValueArray,
    };
  }

  renderContentFunction({
    content,
    filtersSelected,
    filterConfig,
  }: RenderContentProps) {
    const addtionalFieldsObject = filterConfig[0]?.data.additionalFields;
    const FilterConfigObject = {
      ...addtionalFieldsObject,
    };
    const keys = Object.keys(FilterConfigObject);
    let contentArray: Array<any> = [];
    const tempContent = content;
    filtersSelected?.map((item: any) => {
      const itemName = item.name;
      const filterSelectedArray = item.value;
      const fieldKey = keys.filter((item) => {
        return item.toLowerCase() === itemName?.toLowerCase();
      });
      const fieldObj = FilterConfigObject[fieldKey[0]];
      const field = fieldObj?.field;
      tempContent?.map((item: any) => {
        if (item[field] !== undefined) {
          filterSelectedArray.map((ele: any) => {
            if (item[field].includes(ele)) {
              contentArray.push(item);
            }
          });
        }
      });
    });
    return contentArray;
  }

  isArray(item: any) {
    if (Array.isArray(item)) {
      return item[0];
    } else {
      return item;
    }
  }

  cardFieldsRender(item: any, CardFieldsObject: any) {
    const fieldKeys = Object.keys(CardFieldsObject);
    let objectReturn: ServiceFunctionCardProps = {};
    let tagsArray: Array<string> = [];
    fieldKeys.map((Field: string) => {
      if (item.hasOwnProperty(CardFieldsObject[Field].field)) {
        objectReturn[Field as keyof ServiceFunctionCardProps] = this.isArray(
          item[CardFieldsObject[Field].field]
        );
      }
      if (Field === 'tags') {
        const TagsFieldsArray = CardFieldsObject[Field].tagsFieldArray;
        TagsFieldsArray.map((tagField: string) => {
          if (item.hasOwnProperty(tagField))
            tagsArray.push(this.isArray(item[tagField]));
        });
      }
    });
    objectReturn['tags'] = tagsArray;
    return objectReturn;
  }

  termsFetch(
    data: any,
    // setMasterFieldsTerms:   ,
    filterConfig?: any
  ) {
    const categories = data.result.framework.categories;
    const termsObject: any = {};
    categories.map((item: any) => {
      const name = item.name;
      if (filterConfig[0].data.PrimaryFields[name]?.isEnabled) {
        const associations = item.terms[0].associations
          ? item.terms[0].associations
          : item.terms;
        associations.map((item: any) => {
          if (termsObject.hasOwnProperty(item.category)) {
            let tempArr = termsObject[item.category as keyof any].terms;
            tempArr.push(item.name);
            const newSet = new Set(tempArr);
            termsObject[item.category as keyof any].terms = Array.from(newSet);
          } else {
            termsObject[item.category as keyof any] = {
              name: item.category,
              terms: [item.name],
            };
          }
        });
      }
    });
    return [termsObject];
  }

  masterFieldContentChange(filtersArray: any, filterConfig: any, body: string) {
    const bodyJson = JSON.parse(body);
    const tempObj: any = {};

    filtersArray.map((item: any) => {
      const itemName = item.name.toLowerCase();
      const configfiled = filterConfig.filter((fil: any) => {
        return fil.name.toLowerCase() === itemName;
      });
      tempObj[configfiled[0]?.field] = item.value;
    });
    const keys = Object.keys(bodyJson.request.filters);
    keys.map((item: any) => {
      if (tempObj[item] !== undefined) {
        bodyJson.request.filters[item] = tempObj[item];
      }
    });
    return JSON.stringify(bodyJson);
  }

  dependentTermsFetch(thing: any, filters: any, filterOptions: any) {
    let obj: any = {};
    thing.result.framework.categories?.map((item: any) => {
      filters?.map((filter: any) => {
        if (item.code.toLowerCase() === filter.name.toLowerCase()) {
          const arr = filter.value;
          item.terms.map((item: any) => {
            if (arr.includes(item.name)) {
              item.associations.map((item: any) => {
                if (obj[item.category] === undefined) {
                  obj[item.category] = [item.name];
                } else {
                  // Concatenate the existing values with the new item's name
                  const concatenatedValues = obj[item.category].concat(
                    item.name
                  );

                  // Convert the concatenated values into a Set to remove duplicates
                  const uniqueValuesSet = new Set(concatenatedValues);

                  // Convert the Set back into an array using Array.from()
                  const uniqueValuesArray = Array.from(uniqueValuesSet);

                  obj[item.category] = uniqueValuesArray.sort();
                }
              });
            }
          });
        }
      });
    });
    const keys = Object.keys(filterOptions[0]);
    keys.map((item: any) => {
      if (obj.hasOwnProperty(item)) {
        filterOptions[0][item].terms = obj[item];
      }
    });
    return filterOptions;
  }

  frameworksOptionsRender(frameworks: Array<any>) {
    let options: Array<string> = [];
    frameworks?.map((item: any) => {
      options.push(item.name);
    });
    return options;
  }

  getFrameworkID(frameworks: Array<any>, framework: string) {
    let id: string = '';
    frameworks?.map((item: any) => {
      if (item.name === framework) {
        id = item.identifier;
      }
    });
    return id;
  }
}
