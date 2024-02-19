/**
 * | Author- Sanjiv Kumar
 * | Created On- 08-02-2024
 * | Created for- Input Field
 * | Status- done
 */

export default function goBack() {
  // Use the history object to navigate back
  window.history.back();
}

export function DateFormatter(date: string) {
  return new Date(date).toISOString().split("T")[0];
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

export const filterValBefStoring = (values: any) => {
  function mapingObject(obj: any) {
    const modifiedObj = {...obj};
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