/**
 * | Author- Krish
 * | Created On- 25-02-2024
 * | Created for- Input Field
 * | Status- done
 */
import { v4 as uuidv4 } from "uuid";

export default function goBack() {
  // Use the history object to navigate back
  window.history.back();
}

export function DateFormatter(date: string) {
  return new Date(date).toISOString();
}

/**
 * | Author- Krish
 * | Created On- 09-02-2024
 * | Created for- Format String
 * | Status- closed
 */
export function formatString(input: string): string {
  const regex = /(?:^|-)([a-z])/g;
  const result = input?.replace(regex, (_, match) => ` ${match.toUpperCase()}`);
  return result;
}

// remove any empty object from an array
export function removeObj(array: any[]): any[] {
  const filterObj = array.filter((obj) => {
    // Check if the object is empty
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return false;
    }

    // Check if all values in the object are empty
    const allValuesEmpty = Object.values(obj).every((value) => value === "");

    return !allValuesEmpty;
  });

  return filterObj;
}

export const generateUniquePaymentNo = (initialString?: string): string => {
  const uniqueId = uuidv4();
  // Extract the first 8 characters from the UUID
  const unqId = uniqueId.substring(0, 6);
  return initialString ? initialString + unqId : unqId;
};

export const filterValBefStoring = (values: any) => {
  function mapingObject(obj: any) {
    const modifiedObj = { ...obj };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(modifiedObj, key)) {
        if (key.toLowerCase().endsWith("id_name") || key === "id") {
          delete modifiedObj[key];
        } else if (key.toLowerCase().endsWith("date")) {
          modifiedObj[key] = `${new Date(modifiedObj[key]).toISOString()}`;
        }
      }
    }
    return modifiedObj;
  }

  if (values.length > 0) {
    return values.map((item: any) => {
      return mapingObject(item); // Return the modified item
    });
  } else {
    return mapingObject(values); // Return the modified values
  }
};
