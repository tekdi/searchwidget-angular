export interface StyleProps {
  wrapperStyle?: {
    container?: {};
    sidebar?: {};
    filtersDiv?: {};
    filter?: {};
    button?: {};
    listDiv?: {};
  };

  filterStyle?: {
    container?: {};
    optionNameStyle?: {};
    optionStyle?: {};
    optionDivStyle?: {};
    select?: {};
    optionsItem?: {};
  };

  cardStyle?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    lowerDiv?: {};
    lowerItem?: {};
    lowerDt?: {};
    lowerDd?: {};
    tag?: {};
  };
}

export interface Configs {
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps>;
}

export interface InputApiProps {
  url: string;
  headers?: object;
  method: string;
  body?: string;
  cache?:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
}

export interface AllInputApiProps {
  formApi: InputApiProps;
  searchApi: InputApiProps;
  termsApi: InputApiProps;
  getDefaultChannelApi: InputApiProps;
  getChannelApi: InputApiProps;
}

export interface CardStyle {
  container?: {};
  headingDiv?: {};
  heading?: {};
  type?: {};
  imageDiv?: {};
  image?: {};
  tagsDiv?: {};
  lowerDiv?: {};
  lowerItem?: {};
  lowerDt?: {};
  lowerDd?: {};
  tag?: {};
}

export interface FilterStyle {
  container?: {};
  optionNameStyle?: {};
  optionStyle?: {};
  optionDivStyle?: {};
  select?: {};
  optionsItem?: {};
}

export interface FilterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

export type CardFieldsObject = {
  name?: {
    field: string;
    isEnabled?: boolean;
  };
  type?: {
    field: string;
    isEnabled?: boolean;
  };
  subject?: {
    field: string;
    isEnabled?: boolean;
  };
  image?: {
    field: string;
    isEnabled?: boolean;
  };
  publisher?: {
    field: string;
    isEnabled?: boolean;
  };
  tags?: {
    tagsFieldArray: Array<string>;
    isEnabled?: boolean;
  };
};

export interface WrapperProps {
  hostname: string;
  defaultChannel: {
    url: string;
    method: string;
    cache:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
    header: object;
  };
  getChannel: {
    method: string;
    cache:
      | 'default'
      | 'no-store'
      | 'reload'
      | 'force-cache'
      | 'only-if-cached'
      | 'no-cache';
    header: object;
  };
  searchApi: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  termsRead: {
    url: string;
    headers: object;
    method: string;
    body: string;
  };
  formUrl: string;
  cardFieldsProps: CardFieldsObject;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
}

export interface ApiContextProps {
  formUrl: string;
  searchApi: {
    url: string;
    method: string;
    headers?: object;
    body: string;
  };
  cardFieldsProps: CardFieldsObject;
  hostname: string;
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
  termsApi: {
    method: string;
    headers?: object;
    body?: string;
  };
  frameworks: Array<string>;
}

export interface FiltersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface CardProps {
  name: string;
  image?: string;
  subject: string;
  type: string;
  publisher: string;
  tags?: Array<string>;
  styles?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    lowerDiv?: {};
    lowerItem?: {};
    lowerDt?: {};
    lowerDd?: {};
    tag?: {};
  };
}
