/**
 *
 * FormNumberField/createNumberMask
 *
 */

import { CARET_TRAP, Mask } from '../FormMaskedField/textMask';

const emptyString = '';
const comma = ',';
export const defaultDecimalSymbol = '.';
const minus = '-';
const minusRegExp = /-/;
const nonDigitsRegExp = /\D+/g;
const number = 'number';
const digitRegExp = /\d/;

function convertToMask(strNumber: string) {
  return strNumber.split(emptyString).map((char) => (digitRegExp.test(char) ? digitRegExp : char));
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n: string, thousandsSeparatorSymbol: string) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}

export interface CreateNumberMaskProps {
  prefix?: string;
  suffix?: string;
  includeThousandsSeparator?: boolean;
  thousandsSeparatorSymbol?: string;
  allowDecimal?: boolean;
  decimalSymbol?: string;
  decimalLimit?: number;
  requireDecimal?: boolean;
  allowNegative?: boolean;
  allowLeadingZeroes?: boolean;
  integerLimit?: number;
}

export function createNumberMask({
  prefix = emptyString,
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = comma,
  allowDecimal = true,
  decimalSymbol = defaultDecimalSymbol,
  decimalLimit = 2,
  requireDecimal = false,
  allowNegative = false,
  allowLeadingZeroes = false,
  integerLimit = undefined,
}: CreateNumberMaskProps = {}): Mask {
  const prefixLength = (prefix && prefix.length) || 0;
  const suffixLength = (suffix && suffix.length) || 0;
  const thousandsSeparatorSymbolLength =
    (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

  function numberMask(rawValue = emptyString) {
    const rawValueLength = rawValue.length;

    if (rawValue === emptyString || (rawValue[0] === prefix[0] && rawValueLength === 1)) {
      return prefix
        .split(emptyString)
        .concat([digitRegExp as any]) // because the type is `string[]` but should be `(string | RegExp)[]`
        .concat(suffix.split(emptyString));
    } else if (rawValue === decimalSymbol && allowDecimal) {
      return prefix
        .split(emptyString)
        .concat(['0', decimalSymbol, digitRegExp as any]) // because the type is `string[]` but should be `(string | RegExp)[]`
        .concat(suffix.split(emptyString));
    }

    const isNegative = rawValue[0] === minus && allowNegative;
    //If negative remove "-" sign
    if (isNegative) {
      rawValue = rawValue.toString().substr(1);
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
    const hasDecimal = indexOfLastDecimal !== -1;

    let integer;
    let fraction;
    let mask;

    // remove the suffix
    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1);
    }

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(
        rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0,
        indexOfLastDecimal,
      );

      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
      fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString));
    } else {
      if (rawValue.slice(0, prefixLength) === prefix) {
        integer = rawValue.slice(prefixLength);
      } else {
        integer = rawValue;
      }
    }

    if (integerLimit && typeof integerLimit === number) {
      const thousandsSeparatorRegex =
        thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
      const numberOfThousandSeparators = (
        integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []
      ).length;

      integer = integer.slice(
        0,
        integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength,
      );
    }

    integer = integer.replace(nonDigitsRegExp, emptyString);

    if (!allowLeadingZeroes) {
      integer = integer.replace(/^0+(0$|[^0])/, '$1');
    }

    integer = includeThousandsSeparator
      ? addThousandsSeparator(integer, thousandsSeparatorSymbol)
      : integer;

    mask = convertToMask(integer);

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask.push(CARET_TRAP);
      }

      mask.push(decimalSymbol, CARET_TRAP);

      if (fraction) {
        if (typeof decimalLimit === number) {
          fraction = fraction.slice(0, decimalLimit);
        }

        mask = mask.concat(fraction);
      }

      if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
        mask.push(digitRegExp);
      }
    }

    if (prefixLength > 0) {
      mask = prefix.split(emptyString).concat(mask as any); // because the type is `string[]` but should be `(string | RegExp)[]`
    }

    if (isNegative) {
      // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
      if (mask.length === prefixLength) {
        mask.push(digitRegExp);
      }

      mask = [minusRegExp].concat(mask as any); // because the type is `string[]` but should be `(string | RegExp)[]`
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(emptyString));
    }

    return mask;
  }

  numberMask.instanceOf = 'createNumberMask';

  return numberMask;
}
