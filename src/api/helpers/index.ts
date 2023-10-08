// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToArray<T>(object: any) {
    const array: T[] = [];
  
    for (const elem in object) {
      array.push({
        ...object[elem],
        id: elem,
      });
    }
    return array;
  }