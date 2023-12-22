import { OperationDefaultArgs, Operation } from '../components/OperationUtils';
import { sym } from '../components/utils';
import {
  symDf,
  CommandConfigT,
  bakedArgSpecs,
} from '../components/CommandUtils';
import { DFData, DFWhole } from '../components/DFViewerParts/DFWhole';

export const bakedOperationDefaults: OperationDefaultArgs = {
  dropcol: [sym('dropcol'), symDf, 'col'],
  fillna: [sym('fillna'), symDf, 'col', 8],
  resample: [sym('resample'), symDf, 'col', 'monthly', {}],
};

export const bakedCommandConfig: CommandConfigT = {
  argspecs: bakedArgSpecs,
  defaultArgs: bakedOperationDefaults,
};

export const bakedOperations: Operation[] = [
  [sym('dropcol'), symDf, 'col1'],
  [sym('fillna'), symDf, 'col2', 5],
  [sym('resample'), symDf, 'month', 'monthly', {}],
];

export const histograms = {
  num_histo: [
    { name: '-406 - -332', population: 1 },
    { name: '-332 - -258', population: 0 },
    { name: '-258 - -184', population: 2 },
    { name: '-184 - -111', population: 10 },
    { name: '-111 - -37', population: 22 },
    { name: '-37 - 36', population: 30 },
    { name: '36 - 109', population: 22 },
    { name: '109 - 183', population: 10 },
    { name: '183 - 257', population: 3 },
    { name: '257 - 331', population: 0 },
  ],

  bool_histo: [
    { name: 'False', false: 50 },
    { name: 'True', true: 30 },
    { name: 'NA', NA: 20 },
  ],

  NA_Only: [{ name: 'NA', NA: 100 }],

  simple_catgeorical: [
    { name: 2, cat_pop: 87.0 },
    { name: 1, cat_pop: 13.0 },
  ],

  categorical_histo: [
    { name: 'KTM', cat_pop: 30 },
    { name: 'Gas Gas', cat_pop: 15 },
    { name: 'Yamaha', cat_pop: 10 },
    { name: 'unique', unique: 25 },
    { name: 'NA', NA: 20 },
  ],

  categorical_histo_lt: [
    { name: 'KTM', cat_pop: 25 },
    { name: 'Gas Gas', cat_pop: 12 },
    { name: 'Yamaha', cat_pop: 8 },
    { name: 'NA', NA: 20 },
    { name: 'longtail', unique: 15, longtail: 20 },
  ],

  all_unique: [{ name: 'unique', unique: 100 }],

  unique_na: [
    { name: 'unique', unique: 80 },
    { name: 'NA', NA: 20 },
  ],

  unique_continuous: [
    { name: '-406   -332', population: 1 },
    { name: '-332   -258', population: 0 },
    { name: '-258   -184', population: 0 },
    { name: '-184   -111', population: 10 },
    { name: '-111   -37', population: 21 },
    { name: '-37   36', population: 29 },
    { name: '36   109', population: 22 },
    { name: '109   183', population: 9 },
    { name: '183   257', population: 3 },
    { name: '257   331', population: 0 },
    { name: 'unique', unique: 100 },
  ],

  unique_continuous_scaled: [
    { name: '-406   -332', population: 0 },
    { name: '-332   -258', population: 0 },
    { name: '-258   -184', population: 0 },
    { name: '-184   -111', population: 10 },
    { name: '-111   -37', population: 21 },
    { name: '-37   36', population: 29 },
    { name: '36   109', population: 22 },
    { name: '109   183', population: 9 },
    { name: '183   257', population: 3 },
    { name: '257   331', population: 0 },
    { name: 'unique', unique: 29 },
  ],

  unique_continuous_scaled_50: [
    { name: '-406   -332', population: 0 },
    { name: '-332   -258', population: 0 },
    { name: '-258   -184', population: 0 },
    { name: '-184   -111', population: 10 },
    { name: '-111   -37', population: 21 },
    { name: '-37   36', population: 29 },
    { name: '36   109', population: 22 },
    { name: '109   183', population: 9 },
    { name: '183   257', population: 3 },
    { name: '257   331', population: 0 },
    { name: 'longtail', unique: 15 },
  ],
  start_station_categorical: [
    { name: 'Pershing Square N', cat_pop: 1 },
    { name: '8 Ave & W 31 St', cat_pop: 1 },
    { name: 'Lafayette St & E 8 St', cat_pop: 1 },
    { name: 'W 21 St & 6 Ave', cat_pop: 1 },
    { name: 'E 17 St & Broadway', cat_pop: 1 },
    { name: '8 Ave & W 33 St', cat_pop: 1 },
    { name: 'E 43 St & Vanderbilt Ave', cat_pop: 1 },
    { name: 'unique', cat_pop: 0 },
    { name: 'long_tail', cat_pop: 92 },
    { name: 'NA', cat_pop: 0 },
  ],
};

//export const tableDf2:DFWhole = {
export const foo: DFWhole = {
  dfviewer_config: {
    column_config: [
      { col_name: 'index', displayer_args: { displayer: 'obj' } },
      { col_name: 'tripduration', displayer_args: { displayer: 'obj' } },
      { col_name: 'starttime', displayer_args: { displayer: 'obj' } },
      { col_name: 'stoptime', displayer_args: { displayer: 'obj' } },
      { col_name: 'start station id', displayer_args: { displayer: 'obj' } },
      { col_name: 'start station name', displayer_args: { displayer: 'obj' } },
      {
        col_name: 'start station lattitude',
        displayer_args: { displayer: 'obj' },
      },
      { col_name: 'bikeid', displayer_args: { displayer: 'obj' } },
      { col_name: 'birth year', displayer_args: { displayer: 'obj' } },
      { col_name: 'gender', displayer_args: { displayer: 'obj' } },
    ],
    pinned_rows: [],
  },

  //    index: { type: 'obj' },
  //    tripduration: { histogram: histograms.num_histo, type: 'obj' },
  /*
    starttime: { type: 'obj' },
    stoptime: { type: 'obj' },
    'start station id': { type: 'obj' },
    'start station name': { type: 'obj' },
    'start station latitude': { type: 'obj' },
    bikeid: { type: 'obj' },
    'birth year': { type: 'obj' },
    gender: { type: 'obj' },
    */
  data: [
    {
      index: 0,
      tripduration: 404,
      starttime: '2014-07-01 00:00:04',
      stoptime: '2014-07-01 00:06:48',
      'start station id': 545,
      'start station name': 'E 23 St & 1 Ave',
      'start station latitude': 40.736502,
      bikeid: 19578,
      'birth year': '1987',
      gender: 2,
    },
    {
      index: 1,
      tripduration: 850,
      starttime: '2014-07-01 00:00:06',
      stoptime: '2014-07-01 00:14:16',
      'start station id': 238,
      'start station name': 'Bank St & Washington St',
      'start station latitude': 40.7361967,
      bikeid: 19224,
      'birth year': '1987',
      gender: 1,
    },
    {
      index: 2,
      tripduration: 1550,
      starttime: '2014-07-01 00:00:21',
      stoptime: '2014-07-01 00:26:11',
      'start station id': 223,
      'start station name': 'W 13 St & 7 Ave',
      'start station latitude': 40.73781509,
      bikeid: 17627,
      'birth year': '1973',
      gender: 2,
    },
    {
      index: 3,
      tripduration: 397,
      starttime: '2014-07-01 00:00:29',
      stoptime: '2014-07-01 00:07:06',
      'start station id': 224,
      'start station name': 'Spruce St & Nassau St',
      'start station latitude': 40.71146364,
      bikeid: 15304,
      'birth year': '1982',
      gender: 1,
    },
    {
      index: 4,
      tripduration: 609,
      starttime: '2014-07-01 00:00:37',
      stoptime: '2014-07-01 00:10:46',
      'start station id': 346,
      'start station name': 'Bank St & Hudson St',
      'start station latitude': 40.73652889,
      bikeid: 20062,
      'birth year': '1972',
      gender: 2,
    },
  ],
};
export const stringIndexDf = foo;

export const tableDf: DFWhole = {
  dfviewer_config: {
    column_config: [
      {
        col_name: 'index',
        displayer_args: { displayer: 'integer', min_digits: 3, max_digits: 5 },
      },
      {
        col_name: 'nanNumeric',
        displayer_args: { displayer: 'integer', min_digits: 3, max_digits: 5 },
        tooltip_config: {
          tooltip_type: 'simple',
          val_column: 'start station name',
        },
      },
      {
        col_name: 'nanObject',
        displayer_args: { displayer: 'integer', min_digits: 3, max_digits: 5 },
        color_map_config: {
          color_rule: 'color_map',
          map_name: 'DIVERGING_RED_WHITE_BLUE',
          val_column: 'tripduration',
        },
      },
      {
        col_name: 'nanFloat',
        displayer_args: { displayer: 'float' },
        tooltip_config: { tooltip_type: 'summary_series' },
      },
      { col_name: 'end station name', displayer_args: { displayer: 'obj' } },
      {
        col_name: 'tripduration',
        displayer_args: { displayer: 'integer', min_digits: 1, max_digits: 5 },
        color_map_config: {
          color_rule: 'color_map',
          map_name: 'BLUE_TO_YELLOW',
        },
      },
      {
        col_name: 'start station name',
        displayer_args: { displayer: 'obj' },
        color_map_config: {
          color_rule: 'color_not_null',
          conditional_color: 'red',
          exist_column: 'nanFloat',
        },
      },
      { col_name: 'floatCol', displayer_args: { displayer: 'float' } },
    ],
    pinned_rows: [
      { primary_key_val: 'dtype', displayer_args: { displayer: 'obj' } },
      {
        primary_key_val: 'histogram',
        displayer_args: { displayer: 'histogram' },
      },
    ],
  },
  data: [
    {
      index: 0,
      'end station name': 'Elizabeth St & Hester St',
      tripduration: 471,
      'start station name': 'Catherine St & Monroe St',
      floatCol: '1.111',
      nanNumeric: null,
      nanObject: null,
      nanFloat: null,
    },
    {
      index: 1,
      'end station name': 'South St & Whitehall St',
      tripduration: 1494,
      'start station name': '1 Ave & E 30 St',
      floatCol: '8.888',
      nanNumeric: null,
      nanObject: null,
      nanFloat: null,
    },
    {
      index: 2,
      'end station name': 'E 59 St & Sutton Pl',
      tripduration: 464,
      'start station name': 'E 48 St & 3 Ave',
      floatCol: '9.999',
      nanNumeric: null,
      nanObject: null,
      nanFloat: 10,
    },
    {
      index: 3,
      'end station name': 'E 33 St & 5 Ave',
      tripduration: 373,
      'start station name': 'Pershing Square N',
      floatCol: '-10.1',
      nanCol: null,
      nanNumeric: null,
      nanObject: null,
      nanFloat: null,
    },
    {
      index: 4,
      'end station name': 'Hancock St & Bedford Ave',
      tripduration: 660,
      'start station name': 'Atlantic Ave & Fort Greene Pl',
      floatCol: '10.99',
      nanNumeric: null,
      nanObject: null,
      nanFloat: 3,
    },
  ],
};

const tripDurationBins = [0, 300, 500, 1000, 1500];

export const summaryDfForTableDf: DFData = [
  {
    index: 'histogram',
    'end station name': histograms.categorical_histo_lt,
    tripduration: histograms.num_histo,
    'start station name': histograms.bool_histo,
    nanNumeric: histograms.num_histo,
    nanFloat: histograms.num_histo,
    nanObject: histograms.num_histo,
    floatCol: [
      { name: 521, cat_pop: 0.0103 },
      { name: 358, cat_pop: 0.0096 },
      { name: 519, cat_pop: 0.009 },
      { name: 497, cat_pop: 0.0087 },
      { name: 293, cat_pop: 0.0082 },
      { name: 285, cat_pop: 0.0081 },
      { name: 435, cat_pop: 0.008 },
      { name: 'unique', cat_pop: 0.0001 },
      { name: 'long_tail', cat_pop: 0.938 },
      { name: 'NA', cat_pop: 0.0 },
    ],
  },
  {
    index: 'histogram_bins',
    tripduration: tripDurationBins,
    nanObject: tripDurationBins,
  },
  {
    index: 'dtype',
    'end station name': 'String6666',
    tripduration: 'object',
    'start station name': 'object',
    nanNumeric: 'float64',
    nanFloat: 'flot64',
    nanObject: 'object',
    floatCol: 'float',
  },
];

/*
export const stringIndexDf: DFWhole = {
  schema: {
    fields: [
      { name: 'index', type: 'integer' },
      { name: 'datetime_col', type: 'datetime' },
      { name: 'datetime_col2', type: 'datetime' },
      { name: 'a', type: 'integer' },
      { name: 'b', type: 'boolean' },
      { name: 'list_col', type: 'obj' },
      { name: 'strings', type: 'boolean' },
      { name: 'dict_col', type: 'obj' },
    ],
    primaryKey: ['index'],
    pandas_version: '1.4.0',
  },
  data: [
    {
      index: 0,
      a: 1,
      b: true,
      strings: 'a',
      list_col: ['a', 'b'],
      dict_col: { a: 10, b: 20 },
      datetime_col: '2001-01-01T00:00:00.000',
      datetime_col2: '2001-01-01T00:00:00.000',
    },
    {
      index: 1,
      a: 2,
      b: false,
      strings: '',
      list_col: [1, 2],
      dict_col: { b: 20, c: 30 },
      datetime_col: '2001-05-03T00:01:00.000',
      datetime_col2: '2001-05-03T00:01:00.000',
    },
    {
      index: 2,
      a: 3,
      b: false,
      strings: ' ',
      list_col: [true, false],
      dict_col: { a: 'foo' },
      datetime_col: '2001-05-03T15:44:55.000',
      datetime_col2: '2001-05-03T15:44:55.000',
    },
  ],
  table_hints: {
    a: {
      type: 'integer',
      min_digits: 1,
      max_digits: 1,

      histogram: [
        { name: 1, cat_pop: 50.0 },
        { name: 2, cat_pop: 50.0 },
        { name: 'longtail', unique: 100.0 },
      ],
    },
    b: {
      type: 'integer',
      min_digits: 1,
      max_digits: 1,
      histogram: [
        { name: true, cat_pop: 50.0 },
        { name: false, cat_pop: 50.0 },
        { name: 'longtail', unique: 100.0 },
      ],
    },
    strings: { type: 'string', histogram: [] },
    datetime_col: { type: 'datetime', formatter: 'default', histogram: [] },
    datetime_col2: {
      type: 'datetime',
      formatter: 'toLocaleString',
      args: { year: 'numeric', month: 'numeric', day: 'numeric' },
      locale: 'en-CA',
      histogram: [],
    },
  },
};
*/