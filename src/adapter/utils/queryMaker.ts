export const queryMaker = <T>(filter?: (Partial<T> & { full?: boolean }), list: boolean = false) => {
  let query: string = "";
  if (filter) {
    let i = 0;
    Object.entries(filter).forEach((item) => {
      if (item[1]) {
        const string = list
          ? `&${item[0]}=${item[1]}`
          : ((i === 0) ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`);
        query = `${query}${string}`;
        i++;
      }
    });
  }

  return query;
}