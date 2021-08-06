export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

class Storage {
  constructor(keyName, defaultValue) {
    this.keyName = keyName;

    if (!this.exist() && defaultValue) {
      this.save(defaultValue);
    }
  }

  save(data) {
    setItem(this.keyName, data);
  }

  load() {
    return getItem(this.keyName);
  }

  exist() {
    return getItem(this.keyName) ? true : false;
  }

  existById(id) {
    return getItem(this.keyName).find(v => v.id === id) ? true : false;
  }

  push(item) {
    const loadedData = this.load() ?? [];

    if (!Array.isArray(loadedData)) {
      console.error('You can push only on Array');
      return;
    }

    if (!this.existById(item.id)) {
      loadedData.push(item);
      this.save(loadedData);

      return;
    }

    this.save(loadedData.map(v => (v.id === item.id ? item : v)));
  }

  // { title: '전체 사용자', role: 100 },
  // { title: '일반 사용자', role: 0 },
  // { title: '프론트엔드', role: 11 },
  // { title: '백엔드', role: 12 },
  // { title: '서버', role: 13 },
  // { title: '고객지원', role: 21 },
  // { title: '인사관리', role: 22 },

  filterByRole(type) {
    return type
      ? getItem(this.keyName).filter(el => el.role === type)
      : getItem(this.keyName);
  }

  findAllByUsername(page, limit, username, type) {
    console.log(page, limit, username, type);
    const filteredData = this.filterByRole(type);

    console.log('------filterdr----------------');
    console.log(filteredData);

    const searchedData = username
      ? filteredData.filter(el =>
          el.userName.toLowerCase().includes(username.toLowerCase()),
        )
      : filteredData;

    const len = searchedData.length;
    const maxPage =
      searchedData.length % limit
        ? parseInt(len / limit + 1)
        : parseInt(len / limit);

    const next = page < maxPage - 1;
    const prev = page > 0;

    const pageable = {
      maxPage,
      next,
      prev,
      content: searchedData.slice(page * limit, page * limit + limit),
    };
    console.log(pageable);

    return pageable;
  }
}

export default Storage;
