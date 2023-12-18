import {
  ColDef,
  ValueFormatterFunc,
  ValueFormatterParams,
} from 'ag-grid-community';
import {
  DFWhole,
  DFColumn,
  ColumnHint,
  ColumnIntegertHint,
  ColumnFloatHint,
  ColumnDatetimeHint,
} from './staticData';
import _ from 'lodash';
import { HistogramCell } from './CustomHeader';
export const updateAtMatch = (
  cols: ColDef[],
  key: string,
  subst: Partial<ColDef>,
  negative: Partial<ColDef>
) => {
  const retColumns = cols.map((x) => {
    if (x.field === key) {
      return { ...x, ...subst };
    } else {
      return { ...x, ...negative };
    }
  });
  return retColumns;
};

/*
  this code should all be unit tested and in examples. Examples will
  show potential developers how this behaves. Examples should be made
  inside of AG-Grid, and independently.
  */

export const basicIntFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const stringFormatter = (params: ValueFormatterParams): string => {
  const val = params.value;
  return val;
};

const dictDisplayer = (val: Record<string, any>): string => {
  const objBody = _.map(
    val,
    (value, key) => `'${key}': ${objDisplayer(value)}`
  ).join(',');
  return `{ ${objBody} }`;
};

export const isValidDate = (possibleDate: any): boolean => {
  if (_.isDate(possibleDate) && isFinite(possibleDate.getTime())) {
    return true;
  }
  return false;
};

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

export const dateDisplayerDefault = (d: Date): string => {
  const fullStr = d.toLocaleDateString('en-CA', DEFAULT_DATE_FORMAT);
  const [dateStr, timeStr] = fullStr.split(',');
  const retVal = `${dateStr} ${timeStr}`;
  return retVal;
};


const objDisplayer = (val: any | any[]): string => {
  if (val === undefined || val === null) {
    return 'None';
  } else if (_.isArray(val)) {
    return `[ ${val.map(objDisplayer).join(', ')}]`;
  } else if (_.isBoolean(val)) {
    return boolDisplayer(val);
  } else if (_.isObject(val)) {
    return dictDisplayer(val);
  } else {
    return val.toString();
  }
  return val;
};

const objFormatter = (params: ValueFormatterParams): string => {
  const val = params.value;
  return objDisplayer(val);
};

export const boolDisplayer = (val: boolean) => {
  if (val === true) {
    return 'True';
  } else if (val === false) {
    return 'False';
  }
  return '';
};

export const booleanFormatter = (params: ValueFormatterParams): string => {
  const val = params.value;
  return boolDisplayer(val);
};

const getIntegerFormatter = (hint: IntegerDisplayerA) => {
  const commas = Math.floor(hint.max_digits / 3);
  const totalWidth = commas + hint.max_digits;

  const formatter = new Intl.NumberFormat('en-US');
  const numericFormatter = (params: ValueFormatterParams): string => {
    const val = params.value;
    if (val === null) {
      return '';
    }
    return formatter.format(params.value).padStart(totalWidth, ' ');
  };
  return numericFormatter;
};

const getFloatFormatter = (hint: FloatDisplayerA) => {
  const floatFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  return (params: ValueFormatterParams): string => {
    if (params.value === null) {
      return '';
    }
    return floatFormatter.format(params.value);
  };
};

export const getDatetimeFormatter = (colHint: DatetimeLocaleDisplayerA) => {
  return (params: ValueFormatterParams): string => {
    const val = params.value;
    if (val === null || val === undefined) {
      return '';
    }
    const d = new Date(val);
    if (!isValidDate(d)) {
      return '';
    }
    return d.toLocaleDateString(colHint.locale, colHint.args);
  };
};

export const defaultDatetimeFormatter = (params: ValueFormatterParams): string => {
    const val = params.value;
    if (val === null || val === undefined) {
      return '';
    }
    const d = new Date(val);
    if (!isValidDate(d)) {
      return '';
    }
    return dateDisplayerDefault(d);
};


function getFormatter(fArgs: FormatterArgs): ValueFormatterFunc<unknown> {
  if (fArgs === undefined) {
    return stringFormatter;
  }
  if (fArgs.displayer === 'integer') {
    return getIntegerFormatter(fArgs);
  } else if (fArgs.displayer === 'string') {
    return stringFormatter;
  } else if (fArgs.displayer === 'datetimeDefault') {
    return defaultDatetimeFormatter;
  } else if (fArgs.displayer === 'datetimeLocaleString') {
    return getDatetimeFormatter(fArgs);
  } else if (fArgs.displayer === 'float') {
    return getFloatFormatter(fArgs);
  } else if (fArgs.displayer === 'boolean') {
    return booleanFormatter;
  } else if (fArgs.displayer === 'obj') {
    return objFormatter;
  }
  return stringFormatter;
}

// I'm not sure about adding underlying types too
// they are implied, just not sure
export interface ObjDisplayerA             { displayer: 'obj';     }
export interface BooleanDisplayerA         { displayer: 'boolean'; }
export interface StringDisplayerA          { displayer: 'string';  } //max_length?: number; 
export interface FloatDisplayerA           { displayer: 'float';   }
export interface HistogramDisplayerA       { displayer: 'histogram';   }
export interface DatetimeDefaultDisplayerA { displayer: 'datetimeDefault'; }
export interface IntegerDisplayerA {
  displayer: 'integer';
  min_digits: number;
  max_digits: number;
}

export interface DatetimeLocaleDisplayerA {
  displayer: 'datetimeLocaleString';
  locale: 'en-US' | 'en-GB' | 'en-CA' | 'fr-FR' | 'es-ES' | 'de-DE' | 'ja-JP';
  args: Intl.DateTimeFormatOptions;
}

// Used DisplayerA instead of FormatterArgs,  Displayer makes sense from the python side
// python doesn't care that histogram requires a cellRenderer and Integer only changes the formatter
export type FormatterArgs = ObjDisplayerA | BooleanDisplayerA | StringDisplayerA
  | FloatDisplayerA | DatetimeDefaultDisplayerA | DatetimeLocaleDisplayerA
  | IntegerDisplayerA;
export type CellRendererArgs = HistogramDisplayerA;
export type DisplayerArgs = FormatterArgs | CellRendererArgs;

export const cellRendererDisplayers = ['histogram'];
function getCellRenderer(crArgs: CellRendererArgs) {
  if (crArgs.displayer == 'histogram') {
    return HistogramCell;
  }
  return undefined;
}

function addToColDef(dispArgs: DisplayerArgs, fieldName: string) {
  if (_.includes(cellRendererDisplayers, dispArgs.displayer)) {
    const crArgs: CellRendererArgs = dispArgs as CellRendererArgs;
    return {
      cellRenderer: getCellRenderer(crArgs)
    }
  }
  const fArgs = dispArgs as FormatterArgs;
  const colDefExtras: ColDef = { valueFormatter: getFormatter(fArgs) }
  return colDefExtras;
}

export function dfToAgrid(tdf: DFWhole): [ColDef[], unknown[]] {
  const fields = tdf.schema.fields;
  const retColumns: ColDef[] = fields.map((f: DFColumn) => {
    const colDef: ColDef = {
      field: f.name,
      headerName: f.name,
      //...addToColDef()
    };
    if (f.name === 'index') {
      colDef.pinned = 'left';
    }
    return colDef;
  });
  return [retColumns, tdf.data];
}
