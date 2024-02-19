export function resMessage(value: string): {
    NOT_FOUND: string;
    FOUND: string;
    CREATED: string;
    UPDATED: string;
  } {
    const NOT_FOUND: string =` ${value} Not Found`;
    const FOUND: string = `${value} Found Successfully!!`;
    const CREATED: string =` ${value} created Successfully!!`;
    const UPDATED: string = `${value} updated Successfully!!`;
  
    return { FOUND, NOT_FOUND, CREATED, UPDATED };
  }